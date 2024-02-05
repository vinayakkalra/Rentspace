import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
import List "mo:base/List";

import CanDB "mo:new-candb/CanDB";
import CA "mo:new-candb/CanisterActions";
import Entity "mo:new-candb/Entity";
import StableRbTree "mo:stable-rbtree/StableRBTree";
import {print} "mo:base/Debug";
import Types "../types";
import utils "../utils";

shared ({caller = owner}) actor class Review({
    partitionKey : Text;
    scalingOptions : CanDB.ScalingOptions;
    owners : ?[Principal];
}) {

    stable let db = CanDB.init({
        pk = partitionKey;
        scalingOptions = scalingOptions;
        btreeOrder = null;
    });
    stable var hotelIdMapReviewId = StableRbTree.init<Text, List.List<Text>>();
    stable var reviewIdTree = StableRbTree.init<Text, List.List<Text>>();

    public query func getPk() : async Text {db.pk};

    //@required public API(Do not Delete or Change)
    public query func skExists(sk : Text) : async Bool {
        CanDB.skExists(db, sk);
    };

    func createReviewId(userIdentity : Text, bookingId : Text) : () {
        switch (StableRbTree.get(reviewIdTree, Text.compare, userIdentity)) {
            case (?result) {
                let data = List.push(bookingId, result);
                reviewIdTree := StableRbTree.put(reviewIdTree, Text.compare, userIdentity, data);
                return;
            };
            case null {
                var reviewIdList = List.nil<Text>();
                reviewIdList := List.push(bookingId, reviewIdList);
                reviewIdTree := StableRbTree.put(reviewIdTree, Text.compare, userIdentity, reviewIdList);
                return;
            };
        };
    };
    func linkReviewIdwithHotelId(bookingId : Text) {
        let reviewId = Text.split(bookingId, #text "#");
        var loopCount = 0;
        var hotelId = "";
        for (i in reviewId){
            if(loopCount < 1){
                hotelId:=hotelId # i;
            };
            if(loopCount == 1){
                hotelId := hotelId # "#" #i;
            };
            loopCount:=loopCount+1;
        };
        // for (i in reviewId) {
        //     if (loopCount < 2) {
        //         hotelId := hotelId # "#" #i;
        //     };
        //     loopCount := loopCount +1;
        // };
        print(debug_show (hotelId));
        switch (StableRbTree.get(hotelIdMapReviewId, Text.compare, hotelId)) {
            case (?result) {
                let data = List.push(bookingId, result);
                hotelIdMapReviewId := StableRbTree.put(hotelIdMapReviewId, Text.compare, hotelId, data);
                return;
            };
            case null {
                var reviewIdList = List.nil<Text>();
                reviewIdList := List.push(bookingId, reviewIdList);
                hotelIdMapReviewId := StableRbTree.put(hotelIdMapReviewId, Text.compare, hotelId, reviewIdList);
                return;
            };
        };
    };

    //@required public API (Do not delete or change)
    public shared ({caller = user}) func transferCycles() : async () {
        if (user == owner) {
            return await CA.transferCycles(user);
        };
    };

    public shared ({caller = user}) func createReview(bookingId : Text, reviewData : Types.Review) : async () {
        assert (Principal.isAnonymous(user) == false);

        let userIdentity = Principal.toText(user);
        let identityStatus = await skExists(userIdentity);

        assert (userIdentity != "" and reviewData.bookingId != "" and reviewData.rating > 0 and reviewData.title != "" and reviewData.des != "");
        assert (Text.size(reviewData.bookingId) <= 250 and Text.size(reviewData.title) <= 25 and Text.size(reviewData.title) <= 500);
        let date = utils.getDate();

        createReviewId(userIdentity, bookingId);
        linkReviewIdwithHotelId(bookingId);
        //inserts the entity into CanDB
        await CanDB.put(
            db,
            {
                sk = bookingId;
                attributes = [
                    ("bookingId", #text(reviewData.bookingId)),
                    ("rating", #float(reviewData.rating)),
                    ("title", #text(reviewData.title)),
                    ("des", #text(reviewData.des)),
                    ("createdAt", #text(utils.getDate())),

                ];
            },
        );
    };

    func unWarpReviewInfo(entity : Entity.Entity) : ?Types.Review {
        let {sk; attributes} = entity;
        let bookingIdValue = Entity.getAttributeMapValueForKey(attributes, "bookingId");
        let ratingValue = Entity.getAttributeMapValueForKey(attributes, "rating");
        let titleValue = Entity.getAttributeMapValueForKey(attributes, "title");
        let desValue = Entity.getAttributeMapValueForKey(attributes, "des");
        let createdAt = Entity.getAttributeMapValueForKey(attributes, "createdAt");
        switch (bookingIdValue, ratingValue, titleValue, desValue, createdAt) {
            case (
                ?(#text(bookingId)),
                ?(#float(rating)),
                ?(#text(title)),
                ?(#text(des)),
                ?(#text(createdAt)),

            ) {
                ?{
                    bookingId;
                    rating;
                    title;
                    des;
                    createdAt;
                };
            };
            case _ {
                null;
            };
        };
    };

    public query func getReviewInfo(bookingId : Text) : async ?Types.Review {

        // assert (Principal.isAnonymous(user) == false)

        let userInfo = switch (CanDB.get(db, {sk = bookingId})) {
            case null {null};
            case (?userEntity) {unWarpReviewInfo(userEntity)};
        };
        switch (userInfo) {
            case null {null};
            case (?u) {
                ?u;
            };
        };
    };

    public query func getReviewIdsFromHotelId(hotelId : Text) : async [Text] {

        // assert (Principal.isAnonymous(user) == false)
        let data : [Text] = switch (StableRbTree.get(hotelIdMapReviewId, Text.compare, hotelId)) {
            case (null) {[]};
            case (?result) {List.toArray(result)};
        };
    };
    public shared query ({caller = user}) func getHotelId() : async [Text] {
        let userIdentity = Principal.toText(user);
        assert (Principal.isAnonymous(user) == false);

        switch (StableRbTree.get(reviewIdTree, Text.compare, userIdentity)) {
            case (null) {[]};
            case (?result) {List.toArray(result)};
        };
    };

    public shared ({caller = user}) func updateReviewInfo(bookingId : Text, reviewData : Types.Review) : async ?Types.Review {

        assert (Principal.isAnonymous(user) == false);
        let userIdentity = Principal.toText(user);

        assert (userIdentity != "" and reviewData.rating <= 0 and reviewData.title != "" and reviewData.des != "");
        assert (Text.size(reviewData.bookingId) <= 50 and Text.size(reviewData.title) <= 25 and Text.size(reviewData.title) <= 500);

        let reviewInfo = await CanDB.replace(
            db,
            {
                sk = userIdentity;
                attributes = [
                    ("bookingId", #text(bookingId)),
                    ("rating", #float(reviewData.rating)),
                    ("title", #text(reviewData.title)),
                    ("des", #text(reviewData.des)),
                    ("createdAt", #text(utils.getDate())),
                ];
            },
        );
        switch (reviewInfo) {
            case (null) {null};
            case (?u) {unWarpReviewInfo(u)};
        };
    };

    public shared query ({caller = user}) func scanUsers(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Types.ScanReview {
        assert (Principal.isAnonymous(user) == false);
        //cap the amount of entries one can return from database to reduce load and incentive use pagiation
        let cappedLimit = if (limit > 10) {10} else {limit};
        let {entities; nextKey} = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = cappedLimit;
                ascending = ascending;
            },
        );
        {
            review = arrayUnwarpUser(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarpUser(entities : [Entity.Entity]) : [Types.Review] {
        Array.mapFilter<Entity.Entity, Types.Review>(
            entities,
            func(e) {
                unWarpReviewInfo(e);
            },
        );
    };

    public query func getOwner() : async Text {
        return Principal.toText(owner);
    };
};
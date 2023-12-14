import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import RBT "mo:stable-rbtree/StableRBTree";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int64 "mo:base/Int64";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Prelude "mo:base/Prelude";
import List "mo:base/List";
import Error "mo:base/Error";
import utils "utils";
import Types "types";

shared ({caller = owner}) actor class Hotel({
    //partiton key of this canister
    partitonKey : Text;
    //the scaling options that determine when to auto-scale out this canister storage
    scalingOptions : CanDB.ScalingOptions;
    // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
    owners : ?[Principal];
}) {

    stable var hotelIdTree = RBT.init<Text, List.List<Text>>();

    /// @required (may wrap, but must be present in some form in the canister)
    stable let db = CanDB.init({
        pk = partitonKey;
        scalingOptions = scalingOptions;
        btreeOrder = null;
    });

    // @recommended (not required) public API
    public query func getPK() : async Text {db.pk};

    //@required public API(Do not Delete or Change)
    public query func skExists(sk : Text) : async Bool {
        CanDB.skExists(db, sk);
    };

    //@required public API (Do not delete or change)
    public shared ({caller = caller}) func transferCycles() : async () {
        if (caller == owner) {
            return await CA.transferCycles(caller);
        };
    };

    func putHotelId(userIdentity : Text, hotelId : Text) : async () {

        switch (RBT.get(hotelIdTree, Text.compare, userIdentity)) {
            case (?result) {
                Debug.print(debug_show (result));
                let data = List.push(hotelId, result);
                hotelIdTree := RBT.put(hotelIdTree, Text.compare, userIdentity, data);
                return;
            };
            case null {
                var hotelIdList = List.nil<Text>();
                Debug.print("inside Null");
                hotelIdList := List.push(hotelId, hotelIdList);
                hotelIdTree := RBT.put(hotelIdTree, Text.compare, userIdentity, hotelIdList);
                return;
            };
        };
    };
    ///---------public function to create the new Hotels---------///
    public shared({caller=user}) func createHotel(hotelData : Types.HotelInfo) : async () {
        let userIdentity = Principal.toText(user);
        let hotelId = await utils.createHotelSK(userIdentity);
        let hotelExist = await skExists(hotelId);
        await putHotelId(userIdentity, hotelId);
        if (hotelData.hotelTitle == "" or hotelData.hotelDes == "" or hotelData.hotelImage == "" or hotelData.hotelPrice == "" or hotelData.hotelLocation == "" or hotelExist == true) {
            return ();
        };
        await* CanDB.put(
            db,
            {
                sk = hotelId;
                attributes = [
                    ("hotelTitle", #text(hotelData.hotelTitle)),
                    ("hotelDes", #text(hotelData.hotelDes)),
                    ("hotelImage", #text(hotelData.hotelImage)),
                    ("hotelPrice", #text(hotelData.hotelPrice)),
                    ("hotelLocation", #text(hotelData.hotelLocation)),
                ];
            },
        );
    };
    public shared query ({caller = user}) func getHotelId() : async [Text] {
        let userIdentity = Principal.toText(user);
        return switch (RBT.get(hotelIdTree, Text.compare, userIdentity)) {
            case (?result) {List.toArray<Text>(result)};
            case null {throw Error.reject("no id found")};
        };
    };
    ///----function to get the hotel data using the by passing uuid as sortkey------///
    public query func getHotel(hotelId : Text) : async ?Types.HotelInfo {
        let id = hotelId;
        let hotelData = switch (CanDB.get(db, {sk = id})) {
            case (null) {null};
            case (?data) {unwrapHotel(data)};
        };
        switch (hotelData) {
            case (null) {null};
            case (?u) {?u};
        };
    };

    func unwrapHotel(entity : Entity.Entity) : ?Types.HotelInfo {
        let {sk; attributes} = entity;
        let hotelTitleValue = Entity.getAttributeMapValueForKey(attributes, "hotelTitle");
        let hotelDesValue = Entity.getAttributeMapValueForKey(attributes, "hotelDes");
        let hotelImageValue = Entity.getAttributeMapValueForKey(attributes, "hotelImage");
        let hotelPriceValue = Entity.getAttributeMapValueForKey(attributes, "hotelPrice");
        let hotelLocationValue = Entity.getAttributeMapValueForKey(attributes, "hotelLocation");

        switch (hotelTitleValue, hotelDesValue, hotelImageValue, hotelPriceValue, hotelLocationValue) {
            case (
                ?(#text(hotelTitle)),
                ?(#text(hotelDes)),
                ?(#text(hotelImage)),
                ?(#text(hotelPrice)),
                ?(#text(hotelLocation)),
            ) {
                ?{
                    hotelTitle;
                    hotelDes;
                    hotelImage;
                    hotelPrice;
                    hotelLocation;
                };
            };
            case _ {null};
        };
    };

    ////--function to update the Hotel data---////
    public func updateHotel(hotelId : Text, hotelData : Types.HotelInfo) : async ?Types.HotelInfo {
        let sortKey = hotelId;
        let hotelExist = await skExists(sortKey);
        if (hotelId == "" or hotelData.hotelTitle == "" or hotelData.hotelDes == "" or hotelData.hotelImage == "" or hotelData.hotelPrice == "" or hotelData.hotelLocation == "" or hotelExist == false) {
            return null;
        };
        let newData = await* CanDB.put(
            db,
            {
                sk = sortKey;
                attributes = [
                    ("hotelTitle", #text(hotelData.hotelTitle)),
                    ("hotelDes", #text(hotelData.hotelDes)),
                    ("hotelImage", #text(hotelData.hotelImage)),
                    ("hotelPrice", #text(hotelData.hotelPrice)),
                    ("hotelLocation", #text(hotelData.hotelLocation)),
                ];
            },
        );
        return ?hotelData;
    };

    type ScanHotels = {
        hotels : [Types.HotelInfo];
        nextKey : ?Text;
    };
    ///---pagiantion of Hotels----///
    public query func scanRent(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async ScanHotels {
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
            hotels = arrayUnwarphotels(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarphotels(entities : [Entity.Entity]) : [Types.HotelInfo] {
        Array.mapFilter<Entity.Entity, Types.HotelInfo>(
            entities,
            func(e) {
                let {sk; attributes} = e;
                let hotelTitleValue = Entity.getAttributeMapValueForKey(attributes, "hotelTitle");
                let hotelDesValue = Entity.getAttributeMapValueForKey(attributes, "hotelDes");
                let hotelImageValue = Entity.getAttributeMapValueForKey(attributes, "hotelImage");
                let hotelPriceValue = Entity.getAttributeMapValueForKey(attributes, "hotelPrice");
                let hotelLocationValue = Entity.getAttributeMapValueForKey(attributes, "hotelLocation");

                switch (hotelTitleValue, hotelDesValue, hotelImageValue, hotelPriceValue, hotelLocationValue) {
                    case (
                        ?(#text(hotelTitle)),
                        ?(#text(hotelDes)),
                        ?(#text(hotelImage)),
                        ?(#text(hotelPrice)),
                        ?(#text(hotelLocation)),
                    ) {
                        ?{
                            hotelTitle = hotelTitle;
                            hotelDes = hotelDes;
                            hotelImage = hotelImage;
                            hotelPrice = hotelPrice;
                            hotelLocation = hotelLocation;
                        };
                    };
                    case _ {
                        Debug.print("Invalid data");
                        null;
                    };
                };
            },
        );
    };
    ///-----------------------------Ends Here----------------------------///

};

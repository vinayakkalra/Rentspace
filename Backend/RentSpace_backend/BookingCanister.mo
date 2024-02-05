import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int64 "mo:base/Int64";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Prelude "mo:base/Prelude";
import List "mo:base/List";
import Error "mo:base/Error";
import Entity "mo:candb/Entity";
import CanDB "mo:candb/CanDB";
import CA "mo:candb/CanisterActions";
import RBT "mo:stable-rbtree/StableRBTree";
import DateTime "mo:datetime/DateTime";

import Types "./types";
import utils "./utils";

shared ({caller = owner}) actor class Booking({
    //partiton key of this canister
    partitonKey : Text;
    //the scaling options that determine when to auto-scale out this canister storage
    scalingOptions : CanDB.ScalingOptions;
    // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
    owners : ?[Principal];
}) {

    stable var userXbookingIdTree = RBT.init<Text, List.List<Text>>();
    stable var hotelXBookingIdTree = RBT.init<Text, List.List<Text>>();

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

    func createBookingId(userIdentity : Text, hotelId : Text) : async Text {
        let uuid = await utils.getUuid();
        let date = utils.getDate();
        let bookingId = hotelId # "#" # date # "#" #uuid;
        linkHotelIdBookingId(hotelId, bookingId);
        putUserId(userIdentity, bookingId);
    };

    func putUserId(userIdentity : Text, bookingId : Text) : Text {

        switch (RBT.get(userXbookingIdTree, Text.compare, userIdentity)) {
            case (?result) {
                Debug.print(debug_show (result));
                let data = List.push(bookingId, result);
                userXbookingIdTree := RBT.put(userXbookingIdTree, Text.compare, userIdentity, data);
                return bookingId;
            };
            case null {
                var bookingIdList = List.nil<Text>();
                bookingIdList := List.push(bookingId, bookingIdList);
                userXbookingIdTree := RBT.put(userXbookingIdTree, Text.compare, userIdentity, bookingIdList);
                return bookingId;
            };
        };
    };
    func linkHotelIdBookingId(hotelId : Text, bookingId : Text) {
        switch (RBT.get(hotelXBookingIdTree, Text.compare, hotelId)) {
            case (?result) {
                let data = List.push(bookingId, result);
                hotelXBookingIdTree := RBT.put(hotelXBookingIdTree, Text.compare, hotelId, data);

            };
            case (null) {
                var bookingIdList = List.nil<Text>();
                bookingIdList := List.push(bookingId, bookingIdList);
                hotelXBookingIdTree := RBT.put(hotelXBookingIdTree, Text.compare, hotelId, bookingIdList);
            };
        };
    };

    public shared ({caller = user}) func bookHotel(hotelId : Text, bookingInfo : Types.BookingInfo) : async () {
        let userIdentity = Principal.toText(user);
        // assert (Principal.isAnonymous(user) == false);
        assert (bookingInfo.userId != "" and bookingInfo.date != "" and bookingInfo.bookingDuration != "" and bookingInfo.bookingDuration != "" and bookingInfo.paymentId != "");
        assert (Text.size(bookingInfo.userId) <= 70 and Text.size(bookingInfo.date) <= 20 and Text.size(bookingInfo.bookingDuration) <= 20 and Text.size(bookingInfo.bookingDuration) <= 10 and Text.size(bookingInfo.paymentId) <= 20);

        let bookingDate = utils.getDate();
        let sortKey = await createBookingId(userIdentity, hotelId);

        if (hotelId == "" or bookingInfo.date == "" or sortKey == "") {
            return;
        };
        await* CanDB.put(
            db,
            {
                sk = sortKey;
                attributes = [
                    ("userId", #text(userIdentity)),
                    ("date", #text(bookingDate)),
                    ("bookingDuration", #text(bookingInfo.bookingDuration)),
                    ("cancelStatus", #bool(false)),
                    ("refundStatus", #bool(false)),
                    ("paymentStatus", #bool(false)),
                    ("paymentId", #text(bookingInfo.paymentId)),
                ];
            },
        );
    };

    func unwarpBookingDetails(entity : Entity.Entity) : ?Types.BookingInfo {
        let {sk; attributes} = entity;

        let userIdValue = Entity.getAttributeMapValueForKey(attributes, "userId");
        let dateValue = Entity.getAttributeMapValueForKey(attributes, "date");
        let bookingDurationValue = Entity.getAttributeMapValueForKey(attributes, "bookingDuration");
        let cancelStatusValue = Entity.getAttributeMapValueForKey(attributes, "cancelStatus");
        let refundStatusValue = Entity.getAttributeMapValueForKey(attributes, "refundStatus");
        let paymentStatusValue = Entity.getAttributeMapValueForKey(attributes, "paymentStatus");
        let paymentIdValue = Entity.getAttributeMapValueForKey(attributes, "paymentId");

        switch (userIdValue, dateValue, bookingDurationValue, cancelStatusValue, refundStatusValue, paymentStatusValue, paymentIdValue) {
            case (?(#text(userId)), ?(#text(date)), ?(#text(bookingDuration)), ?(#bool(cancelStatus)), ?(#bool(refundStatus)), ?(#bool(paymentStatus)), ?(#text(paymentId))) {
                ?{
                    userId;
                    date;
                    bookingDuration;
                    cancelStatus;
                    refundStatus;
                    paymentStatus;
                    paymentId;
                };
            };
            case _ {null};
        };
    };

    public shared query ({caller = user}) func getBookingId() : async [Text] {
        // assert (Principal.isAnonymous(user) == false);
        switch (RBT.get<Text, List.List<Text>>(userXbookingIdTree, Text.compare, Principal.toText(user))) {
            case null {[]};
            case (?result) {List.toArray<Text>(result)};
        };
    };
    public query func gethotelXBookingId(hotelId : Text) : async [Text] {
        // assert (Principal.isAnonymous(user) == false);
        switch (RBT.get<Text, List.List<Text>>(hotelXBookingIdTree, Text.compare, hotelId)) {
            case null {[]};
            case (?result) {List.toArray<Text>(result)};
        };
    };

    public shared query ({caller = user}) func getBookingDetials(bookingId : Text) : async ?Types.BookingInfo {
        // assert (Principal.isAnonymous(user) == false);
        let id = bookingId;
        let bookingData = switch (CanDB.get(db, {sk = id})) {
            case (null) {null};
            case (?data) {unwarpBookingDetails(data)};
        };
    };

    public query func scanBooking(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Types.ScanBooking {
        let cappedLimit = if (limit > 10) {10} else {limit};
        let {entities; nextKey} = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = limit;
                ascending = ascending;
            },
        );
        {
            bookings = arrayUnwarpBooking(entities);
            nextKey = nextKey;
        };
    };
    func arrayUnwarpBooking(entities : [Entity.Entity]) : [Types.BookingInfo] {
        Array.mapFilter<Entity.Entity, Types.BookingInfo>(
            entities,
            func(e) {
                unwarpBookingDetails(e);
            },
        );
    };

    public shared ({caller = user}) func updateBookingStatus(bookingId : Text, bookingInfo : Types.BookingInfo) : async () {
        let sortKey = bookingId;
        let checkBookingId = await skExists(bookingId);
        assert (Principal.isAnonymous(user) == false and checkBookingId != false);
        assert (bookingInfo.userId != "" and bookingInfo.date != "" and bookingInfo.bookingDuration != "" and bookingInfo.bookingDuration != "" and bookingInfo.paymentId != "");
        assert (Text.size(bookingInfo.userId) <= 50 and Text.size(bookingInfo.date) <= 20 and Text.size(bookingInfo.bookingDuration) <= 20 and Text.size(bookingInfo.bookingDuration) <= 10 and Text.size(bookingInfo.paymentId) <= 20);
        await* CanDB.put(
            db,
            {
                sk = sortKey;
                attributes = [
                    ("userId", #text(bookingInfo.userId)),
                    ("date", #text(bookingInfo.date)),
                    ("bookingDuration", #text(bookingInfo.bookingDuration)),
                    ("cancelStatus", #bool(bookingInfo.cancelStatus)),
                    ("refundStatus", #bool(bookingInfo.refundStatus)),
                    ("paymentStatus", #bool(bookingInfo.paymentStatus)),
                    ("paymentId", #text(bookingInfo.paymentId)),
                ];
            },
        );
    };

};

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import List "mo:base/List";
import Error "mo:base/Error";
import Char "mo:base/Char";

import Entity "mo:candb/Entity";
import CanDB "mo:candb/CanDB";
import CA "mo:candb/CanisterActions";
import RBT "mo:stable-rbtree/StableRBTree";

import utils "utils";
import Types "types";
import Map "mo:stablehashmap/FunctionalStableHashMap";
import Trie "helper/Trie";

shared ({caller = owner}) actor class Hotel({
    //partiton key of this canister
    partitonKey : Text;
    //the scaling options that determine when to auto-scale out this canister storage
    scalingOptions : CanDB.ScalingOptions;
    // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
    owners : ?[Principal];
}) = this {

    stable var hotelIdTree = RBT.init<Text, List.List<Text>>();

    /// @required for Stable varibles which stores the Trie of HotelName and HotelLocation Helps for sreaching
    stable var hotelNameRootNode : Types.Node = Trie.createNode();
    stable var hotelLocationRootNode : Types.Node = Trie.createNode();

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

    func putHotelId(userIdentity : Text, hotelId : Text, hotelData : Types.HotelInfo) : async () {

        switch (RBT.get(hotelIdTree, Text.compare, userIdentity)) {
            case (?result) {
                let data = List.push(hotelId, result);
                hotelIdTree := RBT.put(hotelIdTree, Text.compare, userIdentity, data);
                insertNameNode(hotelData.hotelTitle, hotelId);
                insertLocationNode(hotelData.hotelLocation, hotelId);
                return;
            };
            case null {
                var hotelIdList = List.nil<Text>();
                hotelIdList := List.push(hotelId, hotelIdList);
                hotelIdTree := RBT.put(hotelIdTree, Text.compare, userIdentity, hotelIdList);
                insertNameNode(hotelData.hotelTitle, hotelId);
                insertLocationNode(hotelData.hotelLocation, hotelId);
                return;
            };
        };
    };
    ///---------public function to create the new Hotels---------///
    public shared ({caller = user}) func createHotel(hotelData : Types.HotelInfo) : async () {

        assert (Principal.isAnonymous(user) == false);

        let userIdentity = Principal.toText(user);
        let hotelId = await utils.createHotelSK(userIdentity);
        let hotelExist = await skExists(hotelId);

        assert (userIdentity != "" and hotelData.hotelTitle != "" and hotelData.hotelDes != "" and hotelData.hotelLocation != "" and hotelData.hotelImage != "" and hotelData.hotelPrice != "");
        assert (Text.size(hotelData.hotelTitle) <= 40 and Text.size(hotelData.hotelDes) <= 300 and Text.size(hotelData.hotelLocation) <= 30 and Text.size(hotelData.hotelPrice) <= 15);
        let getTime = utils.getDate();
        await putHotelId(userIdentity, hotelId, hotelData);
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
                    ("createdAt", #text(getTime)),
                ];
            },
        );
    };
    public shared query ({caller = user}) func getHotelId() : async [Text] {
        assert (Principal.isAnonymous(user) == false);
        let userIdentity = Principal.toText(user);
        return switch (RBT.get(hotelIdTree, Text.compare, userIdentity)) {
            case (?result) {List.toArray<Text>(result)};
            case null {throw Error.reject("no id found")};
        };
    };
    ///----function to get the hotel data using the by passing uuid as sortkey------///
    public shared query ({caller = user}) func getHotel(hotelId : Text) : async ?Types.HotelInfo {
        assert (Principal.isAnonymous(user) == false);
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
        let createAtValue = Entity.getAttributeMapValueForKey(attributes, "createdAt");

        switch (hotelTitleValue, hotelDesValue, hotelImageValue, hotelPriceValue, hotelLocationValue, createAtValue) {
            case (
                ?(#text(hotelTitle)),
                ?(#text(hotelDes)),
                ?(#text(hotelImage)),
                ?(#text(hotelPrice)),
                ?(#text(hotelLocation)),
                ?(#text(createdAt)),
            ) {
                ?{
                    hotelTitle;
                    hotelDes;
                    hotelImage;
                    hotelPrice;
                    hotelLocation;
                    createdAt;
                };
            };
            case _ {null};
        };
    };

    ////--function to update the Hotel data---////
    public shared ({caller = user}) func updateHotel(hotelId : Text, hotelData : Types.HotelInfo) : async ?Types.HotelInfo {
        let sortKey = hotelId;
        let hotelExist = await skExists(sortKey);

        assert (Principal.isAnonymous(user) and hotelId != "" and hotelData.hotelTitle != "" and hotelData.hotelDes != "" and hotelData.hotelLocation != "" and hotelData.hotelImage != "" and hotelData.hotelPrice != "" and hotelExist != false);
        assert (Text.size(hotelData.hotelTitle) <= 40 and Text.size(hotelData.hotelDes) <= 300 and Text.size(hotelData.hotelLocation) <= 30 and Text.size(hotelData.hotelPrice) <= 15);

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
                    ("createdAt", #text(utils.getDate())),
                ];
            },
        );
        return ?hotelData;
    };

    ///---pagiantion of Hotels----///
    public query func scanRent(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Types.ScanHotels {
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
            hotels = arrayUnwarpHotels(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarpHotels(entities : [Entity.Entity]) : [Types.HotelInfo] {
        Array.mapFilter<Entity.Entity, Types.HotelInfo>(
            entities,
            func(e) {
                unwrapHotel(e);
            },
        );
    };

    /// functions to insert the values inside variable trie
    func insertNameNode(lastName : Text, user : Text) : () {
        var newNode : Types.Node = hotelNameRootNode;
        for (char in Text.toIter(lastName)) {
            let data = Char.toText(char);
            switch (Map.get(newNode.children, Text.equal, Text.hash, data)) {
                case (null) {
                    Map.put(newNode.children, Text.equal, Text.hash, data, Trie.createNode());
                };
                case (?_) {};
            };
            switch (Map.get(newNode.children, Text.equal, Text.hash, data)) {
                case (?node) {newNode := node};
                case (null) {()};
            };
        };
        newNode.isEndOfWord := true;
        newNode.user := Array.append<Text>(newNode.user, [user]);
    };

    /// functions to search the values inside variable trie
    public query func searchNameNode(substring : Text) : async [Text] {
        var node = hotelNameRootNode;
        var result : [Text] = [];
        for (char in Text.toIter(substring)) {
            let data = Char.toText(char);
            switch (Map.get(node.children, Text.equal, Text.hash, data)) {
                case (null) return result;
                case (?childNode) node := childNode;
            };
        };

        result := Trie.collectUsers(node, result);
        return result;
    };

    /// functions to insert the values inside variable trie
    func insertLocationNode(lastName : Text, user : Text) : () {
        var newNode : Types.Node = hotelLocationRootNode;
        for (char in Text.toIter(lastName)) {
            let data = Char.toText(char);
            switch (Map.get(newNode.children, Text.equal, Text.hash, data)) {
                case (null) {
                    Map.put(newNode.children, Text.equal, Text.hash, data, Trie.createNode());
                };
                case (?_) {};
            };
            switch (Map.get(newNode.children, Text.equal, Text.hash, data)) {
                case (?node) {newNode := node};
                case (null) {()};
            };
        };
        newNode.isEndOfWord := true;
        newNode.user := Array.append<Text>(newNode.user, [user]);
    };

    /// functions to search the values inside variable trie
    public query func searchLocationNode(substring : Text) : async [Text] {
        var node = hotelLocationRootNode;
        var result : [Text] = [];
        for (char in Text.toIter(substring)) {
            let data = Char.toText(char);
            switch (Map.get(node.children, Text.equal, Text.hash, data)) {
                case (null) return result;
                case (?childNode) node := childNode;
            };
        };

        result := Trie.collectUsers(node, result);
        return result;
    };
    ///-----------------------------Ends Here----------------------------///
};

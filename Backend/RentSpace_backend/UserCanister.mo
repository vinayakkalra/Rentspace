import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int64 "mo:base/Int64";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Prelude "mo:base/Prelude";
import List "mo:base/List";
import Error "mo:base/Error";

import Entity "mo:candb/Entity";
import CanDB "mo:candb/CanDB";
import CA "mo:candb/CanisterActions";

import RBT "mo:stable-rbtree/StableRBTree";

import Types "types";
import utils "./utils";
// let g = Source.Source();
// UUID.toText(await g.new());

shared ({caller = owner}) actor class User({
    //partiton key of this canister
    partitonKey : Text;
    //the scaling options that determine when to auto-scale out this canister storage
    scalingOptions : CanDB.ScalingOptions;
    // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
    owners : ?[Principal];
}) {

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
    public shared ({caller = user}) func transferCycles() : async () {
        if (user == owner) {
            return await CA.transferCycles(user);
        };
    };

    //     public func getUuid():async Text{
    //     let g = Source.Source();
    //     UUID.toText(await g.new());
    //   };
    ///--------------------------------------------------------------------///
    ///------schema for listing the rent spaces start from here------------///
    ///--------------------------------------------------------------------///
    // Create a new user. In this basic case, we're using the pricipalId of User as the sort key

    public shared ({caller = user}) func createUser(userData : Types.User) : async () {
        // assert (Principal.isAnonymous(user) == false);

        let userIdentity = Principal.toText(user);
        let identityStatus = await skExists(userIdentity);

        assert (userIdentity != "" and userData.firstName != "" and userData.lastName != "" and userData.dob != "" and userData.userEmail != "");
        // assert (Text.size(userData.firstName) <= 25 and Text.size(userData.lastName) <= 25 and Text.size(userData.userEmail) <= 50 and utils.checkDate(userData.dob) == false and utils.checkEmail(userData.userEmail));
        let date = utils.getDate();
        //inserts the entity into CanDB
        await* CanDB.put(
            db,
            {
                sk = userIdentity;
                attributes = [
                    ("firstName", #text(userData.firstName)),
                    ("lastName", #text(userData.lastName)),
                    ("dob", #text(userData.dob)),
                    ("userEmail", #text(userData.userEmail)),
                    ("userType", #text("guest")),
                    ("userProfile", #text("")),
                    ("userGovId", #text("")),
                    ("hostStatus", #bool(false)),
                    ("verificationStatus", #bool(false)),
                    ("createdAt", #text(date)),
                    ("agreementStatus",#bool(false))
                ];
            },
        );
    };

    // attempts to cast an Entity (retrieved from CanDB) into a User type
    func unWarpUserInfo(entity : Entity.Entity) : ?Types.UserInfo {
        let {sk; attributes} = entity;
        Debug.print(debug_show (entity));
        let userIdValue = Entity.getAttributeMapValueForKey(attributes, "userId");
        let firstNameValue = Entity.getAttributeMapValueForKey(attributes, "firstName");
        let lastNameValue = Entity.getAttributeMapValueForKey(attributes, "lastName");
        let dobValue = Entity.getAttributeMapValueForKey(attributes, "dob");
        let userEmailValue = Entity.getAttributeMapValueForKey(attributes, "userEmail");
        let userTypeValue = Entity.getAttributeMapValueForKey(attributes, "userType");
        let userProfileValue = Entity.getAttributeMapValueForKey(attributes, "userProfile");
        let userGovIdValue = Entity.getAttributeMapValueForKey(attributes, "userGovId");
        let hostStatusValue = Entity.getAttributeMapValueForKey(attributes, "hostStatus");
        let verificationStatusValue = Entity.getAttributeMapValueForKey(attributes, "verificationStatus");
        let createdAtValue = Entity.getAttributeMapValueForKey(attributes, "createdAt");
        let agreementStatusValue=Entity.getAttributeMapValueForKey(attributes,"agreementStatus");

        switch (firstNameValue, lastNameValue, dobValue, userEmailValue, userTypeValue, userProfileValue, userGovIdValue, hostStatusValue, verificationStatusValue, createdAtValue,agreementStatusValue) {
            case (
                ?(#text(firstName)),
                ?(#text(lastName)),
                ?(#text(dob)),
                ?(#text(userEmail)),
                ?(#text(userType)),
                ?(#text(userProfile)),
                ?(#text(userGovId)),
                ?(#bool(hostStatus)),
                ?(#bool(verificationStatus)),
                ?(#text(createdAt)),
                ?(#bool(agreementStatus)),
            ) {
                ?{
                    firstName;
                    lastName;
                    dob;
                    userEmail;
                    userType;
                    userProfile;
                    userGovId;
                    hostStatus;
                    verificationStatus;
                    createdAt;
                    agreementStatus;
                };
            };
            case _ {
                null;
            };
        };
    };
    ///----function to get the getUserInfo data using the by passing uuid as sortkey------///

    public query func getUserInfoByPrincipal(user:Principal) : async ?Types.UserInfo {

        let userIdentity = Principal.toText(user);
        let userInfo = switch (CanDB.get(db, {sk = userIdentity})) {
            case null {null};
            case (?userEntity) {unWarpUserInfo(userEntity)};
        };
        switch (userInfo) {
            case null {null};
            case (?u) {
                ?u;
            };
        };
    };

    public shared query ({caller = user}) func getUserInfo() : async ?Types.UserInfo {

        // assert (Principal.isAnonymous(user) == false);

        let userIdentity = Principal.toText(user);
        let userInfo = switch (CanDB.get(db, {sk = userIdentity})) {
            case null {null};
            case (?userEntity) {unWarpUserInfo(userEntity)};
        };
        switch (userInfo) {
            case null {null};
            case (?u) {
                ?u;
            };
        };
    };

    //public function to update the data of the canister
    public shared ({caller = user}) func updateUserInfo(userData : Types.UserInfo) : async ?Types.UserInfo {

        // assert (Principal.isAnonymous(user) == false);
        let userIdentity = Principal.toText(user);

        assert (userIdentity != "" and userData.firstName != "" and userData.lastName != "" and userData.dob != "" and userData.userEmail != "" and userData.userProfile != "" and userData.userGovId != "");
        assert (Text.size(userData.firstName) <= 25 and Text.size(userData.lastName) <= 25 and Text.size(userData.dob) <= 11 and Text.size(userData.userEmail) <= 50 and Text.size(userData.userType) <= 6 and Text.size(userData.userProfile) <= 1000 and Text.size(userData.userGovId) <= 1000);

        let userInfo = await* CanDB.replace(
            db,
            {
                sk = userIdentity;
                attributes = [
                    ("firstName", #text(userData.firstName)),
                    ("lastName", #text(userData.lastName)),
                    ("dob", #text(userData.dob)),
                    ("userEmail", #text(userData.userEmail)),
                    ("userType", #text(userData.userType)),
                    ("userProfile", #text(userData.userProfile)),
                    ("userGovId", #text(userData.userGovId)),
                    ("hostStatus", #bool(userData.hostStatus)),
                    ("verificationStatus", #bool(userData.verificationStatus)),
                    ("createdAt", #text(utils.getDate())),
                    ("agreementStatus",#bool(userData.agreementStatus))
                ];
            },
        );
        switch (userInfo) {
            case (null) {null};
            case (?u) {unWarpUserInfo(u)};
        };
    };
    type ScanUser = {
        users : [Types.UserInfo];
        nextKey : ?Text;
    };

    ///----------Pagination of the User info------------///
    public shared query ({caller = user}) func scanUsers(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async ScanUser {
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
            users = arrayUnwarpUser(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarpUser(entities : [Entity.Entity]) : [Types.UserInfo] {
        Array.mapFilter<Entity.Entity, Types.UserInfo>(
            entities,
            func(e) {
                unWarpUserInfo(e);
            },
        );
    };
    ///----------------------------------------------------------------------///
    ///-------schema for listing the rent spaces start from here-------------///
    ///---------------------------------------------------------------------///
    public query func getOwner() : async Text {
        return Principal.toText(owner);
    };
};

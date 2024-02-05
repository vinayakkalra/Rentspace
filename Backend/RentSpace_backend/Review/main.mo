import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";

import Buffer "mo:stablebuffer/StableBuffer";
import CanisterMap "mo:new-candb/CanisterMap";
import CA "mo:new-candb/CanisterActions";

import Review "ReviewCanister";
import Types "../types";

shared ({caller = owner}) actor class ReviewParent() = this {

    // @required stable variable (do not delete or change)

    //holds the canisterMap of PK -> CanisterIdList
    stable var pkToCanisterMap = CanisterMap.init();

    // @required API (do not delete or Change)

    // Get all canister for an specific PK
    public shared query ({caller = caller}) func getCanistersByPK(pk : Text) : async [Text] {
        getCanistersIdsIfExists(pk);
    };

    // returns all partitions
    public query func getPKs() : async [Text] {
        let allPks = CanisterMap.entries(pkToCanisterMap);

        let iterOfPks = Iter.map<(Text, CanisterMap.CanisterIdList), Text>(
            allPks,
            func(e) {
                e.0;
            },
        );
        return Iter.toArray(iterOfPks);
    };

    func getCanistersIdsIfExists(pk : Text) : [Text] {
        switch (CanisterMap.get(pkToCanisterMap, pk)) {
            case null {[]};
            case (?canisterIdsBuffer) {Buffer.toArray(canisterIdsBuffer)};
        };
    };
    func createCanister(pk : Text, controllers : ?[Principal]) : async Text {
        Debug.print("creating new hello service canister with pk=" # pk);

        Cycles.add(300_000_000_000);
        let newCanister  = await Review.Review({
            partitionKey = pk;
            scalingOptions = {
                autoScalingCanisterId = Principal.toText(Principal.fromActor(this));
                limit = 20_000_000;
                limitType = #heapSize;
            };
            owners = controllers;
        });
        let newCanisterPrincipal = Principal.fromActor(newCanister);

        await CA.updateCanisterSettings({
            canisterId = newCanisterPrincipal;
            settings = {
                controllers = controllers;
                compute_allocation = ?0;
                memory_allocation = ?0;
                freezing_threshold = ?2592000;
            };
        });

        let newCanisterId = Principal.toText(newCanisterPrincipal);
        // After creating the new Hello Service canister, add it to the pkToCanisterMap
        pkToCanisterMap := CanisterMap.add(pkToCanisterMap, pk, newCanisterId);

        Debug.print("new User canisterId=" # newCanisterId);
        newCanisterId;
    };
    public shared ({caller = creator}) func createNewCanister(canisterName : Text) : async ?Text {
        // assert (creator == owner);
        Debug.print(debug_show (creator));
        let pk = canisterName;
        let canisterIds = getCanistersIdsIfExists(pk);
        if (canisterIds == []) {
            ?(await createCanister(pk, ?[owner, Principal.fromActor(this)]));
        } else {
            Debug.print(pk # "already exists");
            null;
        };
    };

};
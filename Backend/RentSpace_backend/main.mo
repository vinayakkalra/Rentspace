import List "mo:base/List";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Buffer "mo:stablebuffer/StableBuffer";

import CA "mo:candb/CanisterActions";
import CanisterMap "mo:candb/CanisterMap";
import Utils "mo:candb/Utils";
import Entity "mo:candb/Entity";
import Admin "mo:candb/CanDBAdmin";
import CanDB "mo:candb/CanDB";

import User "UserCanister";
import Hotel "HotelCanister";
import Booking "BookingCanister";
import Types "types";

shared ({caller = owner}) actor class Database() = this {

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

  func createCanister(pk : Text, controllers : ?[Principal], canister : Types.Canister) : async Text {
    Debug.print("creating new hello service canister with pk=" # pk);

    Cycles.add(300_000_000_000);
    let newCanisterPrincipal : Principal = switch (canister) {
      case (#booking) {
        Principal.fromActor(await Booking.Booking({partitonKey = pk; scalingOptions = {autoScalingHook = autoScaleBookingCanister; sizeLimit = #heapSize(475_000_000)};

        owners = controllers}));
      };

      case (#hotel) {
        Principal.fromActor(await Hotel.Hotel({partitonKey = pk; scalingOptions = {autoScalingHook = autoScaleHotelCanister; sizeLimit = #heapSize(475_000_000)};

        owners = controllers}));
      };
      case (#user) {
        Principal.fromActor(await User.User({partitonKey = pk; scalingOptions = {autoScalingHook = autoScaleUserCanister; sizeLimit = #heapSize(475_000_000)};

        /* Scale out at 475MB */
        /* for auto-scaling testing */
        /* sizeLimit = #count(3); // Scale out at 3 entities inserted */
        owners = controllers}));
      };
    };
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

  public shared ({caller = creator}) func createNewCanister(canisterName : Text, canister : Types.Canister) : async ?Text {
    // assert (creator == owner);
    Debug.print(debug_show (creator));
    let pk = canisterName;
    let canisterIds = getCanistersIdsIfExists(pk);
    if (canisterIds == []) {
      ?(await createCanister(pk, ?[owner, Principal.fromActor(this)], canister));
    } else {
      Debug.print(pk # "already exists");
      null;
    };
  };

  public shared ({caller = caller}) func autoScaleUserCanister(pk : Text) : async Text {
    // Auto-Scaling Authorization - if the request to auto-scale the partition is not coming from an existing canister in the partition, reject it
    if (Utils.callingCanisterOwnsPK(caller, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createCanister(pk, ?[owner, Principal.fromActor(this)], #user);
    } else {
      throw Error.reject("not authorized");
    };
  };

  public shared ({caller = caller}) func autoScaleHotelCanister(pk : Text) : async Text {
    assert (caller == owner);

    // Auto-Scaling Authorization - if the request to auto-scale the partition is not coming from an existing canister in the partition, reject it
    if (Utils.callingCanisterOwnsPK(caller, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createCanister(pk, ?[owner, Principal.fromActor(this)], #hotel);
    } else {
      throw Error.reject("not authorized");
    };
  };

  // Spins up a new HelloService canister with the provided pk and controllers

  public shared ({caller = caller}) func autoScaleBookingCanister(pk : Text) : async Text {
    // Auto-Scaling Authorization - if the request to auto-scale the partition is not coming from an existing canister in the partition, reject it
    if (Utils.callingCanisterOwnsPK(owner, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createCanister(pk, ?[owner, Principal.fromActor(this)], #booking);
    } else {
      throw Error.reject("not authorized");
    };
  };

  public shared ({caller}) func deleteCanister(serviceId : Text) : async () {
    //Warning! change this condition othwer
    // assert (caller == owner);
    // admin can delete any pk by passing in service id of user principal
    let pk = serviceId;

    let canisterIds = getCanistersIdsIfExists(pk);
    if (canisterIds == []) {
      Debug.print("canister with principal=" # pk # " pk=" # pk # " does not exist");
    } else {
      // can choose to use this statusMap for to detect failures and prompt retries if desired
      let statusMap = await Admin.transferCyclesStopAndDeleteCanisters(canisterIds);
      pkToCanisterMap := CanisterMap.delete(pkToCanisterMap, pk);
    };
  };

  public shared ({caller}) func upgradeCanisterByPK(serviceId : Text, wasmModule : Blob) : async Text {
    assert (caller == owner);
    let pk = serviceId;
    let scalingOptions = {
      autoScalingHook = autoScaleUserCanister;
      sizeLimit = #heapSize(475_000_000); // Scale out at 475MB
    };

    let result = await Admin.upgradeCanistersByPK(pkToCanisterMap, pk, wasmModule, scalingOptions);

    return "Canisters in PK " # pk # " upgraded";
  };
  public shared query ({caller}) func whoami() : async Text {
    return Principal.toText(caller);
  };

  public query func getOwner() : async Text {
    return Principal.toText(owner);
  };
  public query func getBalance() : async Nat {
    Cycles.balance();
  };
};

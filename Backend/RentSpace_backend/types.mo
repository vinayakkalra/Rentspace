import Map "mo:stablehashmap/FunctionalStableHashMap";
import Bool "mo:base/Bool";
module {
    public type Canister = {
        #booking;
        #hotel;
        #user;
    };
    public type User = {
        firstName : Text;
        lastName : Text;
        dob : Text;
        userEmail : Text;
    };
    public type UserInfo = {
        firstName : Text;
        lastName : Text;
        dob : Text;
        userEmail : Text;
        userType : Text;
        userProfile : Text;
        userGovId : Text;
        hostStatus : Bool;
        verificationStatus : Bool;
        createdAt : Text;
        agreementStatus:Bool;
    };
    public type HotelInfo = {
        hotelTitle : Text;
        hotelDes : Text;
        hotelImage : Text;
        hotelPrice : Text;
        hotelLocation : Text;
        createdAt : Text;
    };
    public type ScanHotels = {
        hotels : [HotelInfo];
        nextKey : ?Text;
    };
    public type BookingInfo = {
        userId : Text;
        date : Text;
        bookingDuration : Text;
        cancelStatus : Bool;
        refundStatus : Bool;
        paymentStatus : Bool;
        paymentId : Text;
    };
    public type ScanBooking = {
        bookings : [BookingInfo];
        nextKey : ?Text;
    };
    public type Node = {
        var children : Map.StableHashMap<Text, Node>;
        var isEndOfWord : Bool;
        var user : [Text];
    };
    public type Review = {
        bookingId : Text;
        rating : Float;
        title : Text;
        des : Text;
        createdAt : Text;
    };
    public type ScanReview = {
        review : [Review];
        nextKey : ?Text;
    };
};

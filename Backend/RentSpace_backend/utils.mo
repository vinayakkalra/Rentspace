import uuid "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
// import "    ";
module {
    public func getUuid() : async Text {
        let g = Source.Source();
        uuid.toText(await g.new());
    };
    public func createHotelSK(userIdentity : Text) : async Text {
        let uuid = await getUuid();
        return userIdentity # "#" # uuid;
    };

};

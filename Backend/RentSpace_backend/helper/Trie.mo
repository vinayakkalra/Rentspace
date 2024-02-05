import Types "../types";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Map "mo:stablehashmap/FunctionalStableHashMap";
module {
    public func createNode() : Types.Node {
        {
            var children = Map.init<Text, Types.Node>();
            var isEndOfWord = false;
            var user = [];
        };
    }; 
    public func collectUsers(node : Types.Node, result : [Text]) : [Text] {
        var arrResult = result;
        if (node.isEndOfWord == true) {
            arrResult := Array.append<Text>(node.user, arrResult);
        };

        for (key in Map.keys(node.children)) {

            switch (Map.get(node.children, Text.equal, Text.hash, key)) {
                case (?child) {
                    arrResult := Array.append<Text>(collectUsers(child, result), arrResult);
                };
                case (null) {};
            };
        };
        return arrResult;
    };
};

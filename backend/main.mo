import Result "mo:base/Result";
import Text "mo:base/Text";

import Float "mo:base/Float";
import Error "mo:base/Error";

actor Calculator {
    // Addition function
    public func add(x : Float, y : Float) : async Float {
        x + y
    };

    // Subtraction function
    public func subtract(x : Float, y : Float) : async Float {
        x - y
    };

    // Multiplication function
    public func multiply(x : Float, y : Float) : async Float {
        x * y
    };

    // Division function with error handling
    public func divide(x : Float, y : Float) : async Result.Result<Float, Text> {
        if (y == 0) {
            #err("Error: Division by zero")
        } else {
            #ok(x / y)
        }
    };
}

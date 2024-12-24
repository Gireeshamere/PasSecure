import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
actor {
  public type Appdata= {
    prin : Principal ;
    appName: Text;
    appPass: Text;
  };

  var App_data :[Appdata]= [];

  public func SetAppData(det: Appdata) : async Text {
    App_data := Array.append<Appdata>(App_data,[det]);
    return "OK";

  } ;

  public shared query func GetAppData(prin: Principal ) : async [Appdata]{
      return Array.filter<Appdata>(App_data, func x=x.prin==prin);
  }


};

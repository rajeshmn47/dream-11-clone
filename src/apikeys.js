export function getkeys() {
  const hours = new Date().getHours() - 15;
  console.log(hours, "totalhits");
  if (hours > 6) {
    const keyindex = Math.floor(hours / 3);
    const keyi = Math.floor(keyindex / 250);
    console.log(keyi, "index");
    const keys = [
      "29c032b76emsh6616803b28338c2p19f6c1jsn8c7ad47ac806",
      "3e774772f1mshd335b4ddbbd2512p194714jsnb9cc15174c3b",
      "f6c54e8046msh9ade928a37f126bp15dc9fjsnbdbaac07848f",
      "3ddef92f6emsh8301b1a8e1fd478p15bb8bjsnd0bb5446cadc",
      "006ab906e4msha11eadbec0202a7p17e626jsnd019becb8cdc",
      "36bfaeaf2bmshf3d4c6a7d578422p138403jsn352bedc63511",
      "22e5eb9581msh463d68b77f60aedp15ca87jsn7178d984f2fc",
      "77cac70752msh1ce13ec8cd5c240p1160fbjsn5e68d56cf5a5",
      "5658c3593amshd74d634f219e8d1p148490jsna5981aed9d41",
      "4c7d3711a8mshb541cbf54879207p15aac7jsn48daf03743bb",
      "7d69e855b3msh2af85cba1aea4aep1eefd4jsn98b669d3d010",
      "a5da117d90msh3e694894d3b7dbfp12cc3bjsn8167b3fc201c",
    ];
    return keys[keyi];
  }
  return "29c032b76emsh6616803b28338c2p19f6c1jsn8c787t806";
}

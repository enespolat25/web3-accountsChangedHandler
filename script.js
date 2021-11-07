let accounts;

window.onload = function () {
  console.log("DApp is loaded");
  if(window.ethereum){
    this.ethereum.on("accountsChanged",handleAccountsChanged);

    window.ethereum.request({method:'eth_accounts'})
    .then(handleAccountsChanged)
    .catch((error) => {
      console.log(error);
    })

  } else{
    console.log("Lütfen Metamask ı yükleyiniz.");
  }
};
const handleAccountsChanged =(a)=>{
  console.log("Accounts changed");
  accounts =a;

  
  document.getElementById("p").innerHTML ="Henüz Bağlantı Kurulamadı";
  document.getElementById("p2").innerHTML ="";
  

}

const connectEth = async () => {
  accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err.code);
    });

  console.log(accounts[0]);
  document.getElementById("p").innerHTML =
    " Bağlantı kurulan hesap : " + accounts[0];
};

const checkEthBalance = async () => {
  let balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [accounts[0]
    ]
  }).catch((err) => {
    console.log(err);
  });

  balance = parseInt(balance);
  balance = balance/Math.pow(10,18);
  console.log(balance);
  document.getElementById("p2").innerHTML =
    balance+ " ETH (HESAP ID:"+accounts[0] +")";
};

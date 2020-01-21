let arrtochek=[1,0,0,1,1,1];

bintodeci=(arr)=>{
    let num=0;
    letnewnum=0;
    let arrnum = [];
    let left;
    let right;
    for(i=arr.lenght-1,i>0,i--){
        if (arr[i]!=0) {
            num=num+(arr[i]*Math.pow(2,(arr.lenght-i)))      
        }
        while (num>0 ){
            newnum= num%10;
            arrnum.unshift(newnum);
            num=(num-newnum)/10;
        }
        while (arrnum>1 && counter==1) {
            left= arrnum.shift();
            right=arrnum.pop();
            if (left!=right){
                counter=0;
                return false;
            }
            else return ('this is palindrom')
        }

    }

}
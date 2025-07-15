let product = [{
    name : "samsung",
    amount : 70000,
    quantity : 10
},
{
    name: "Iphone 16",
    amount : 100000,
    quantity : 0
}];

// Callbackversion 
// function buyProduct(product_name, cb) {
//     let isproduct = product.filter((p) => p.name == product_name)[0];
//     if (!isproduct) {
//         cb("Product not found", null);
//         return; // Prevents calling cb twice
//     }
//     if (isproduct.quantity <= 0) {
//         cb("Product out of stock", null);
//         return;
//     }
//     cb(null, isproduct.amount);
// }

//  Promise version of buyProduct
function buyProduct(product_name) {
    return new Promise((resolve, reject) => {
        let isproduct = product.find(p => p.name === product_name);

        if (!isproduct) {
            reject("Product not found");
        } else if (isproduct.quantity <= 0) {
            reject("Product out of stock");
        } else {
            resolve(isproduct.amount);
        }
    });
}

let AvailableAmount = 80000;
console.log("Available Amount =", AvailableAmount);


// function deductbankamount(amount, cb) {
//     if (AvailableAmount < amount) {
//         cb("Insufficient bank balance", null);
//         return;
//     }
//     AvailableAmount -= amount;
//     console.log("available amount =", AvailableAmount);
//     cb(null, "Transaction successful");
// }

// Promise version of deductbankamount
function deductbankamount(amount) {
    return new Promise((resolve, reject) => {
        if (AvailableAmount < amount) {
            reject("Insufficient bank balance");
        } else {
            AvailableAmount -= amount;
            console.log("available amount =", AvailableAmount);
            resolve("Transaction successful");
        }
    });
}
//pomise

buyProduct("samsung")
    .then(amount => {
        console.log("amount of phone =", amount);
        return deductbankamount(amount);
    })
    .then(message => {
        console.log(message);
    })
    .catch(err => {
        console.log("Error:", err);
    });

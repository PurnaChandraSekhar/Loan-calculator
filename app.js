//Listen for submit event
document.querySelector('#form').addEventListener('submit', function(e){
    e.preventDefault();

     //intially hide results
     document.querySelector('.container-2').style.display = 'none';
    
    //check values
    let loanAmount = document.querySelector('#loan-amount').value;
    let interestAmount = document.querySelector('#interest-amount').value;
    let payment = document.querySelector('#payment').value;
    
     if(loanAmount <= 0 || interestAmount <= 0 || payment <=0) {
        errorMessage("please check your input");
        return;
     }

    // output variables
    let monthlyPayment = document.querySelector('#monthly');
    let interest = document.querySelector('#interest');
    let totalPayment = document.querySelector('#total-payment');
 
     //calculate result
     let principal = parseFloat(loanAmount);
     let calculatedInterest = parseFloat(interestAmount) / 100 / 12;
     let calculatedPayments = parseFloat(payment) * 12;

     
     //compute monthly payment
     const x = Math.pow(1 + calculatedInterest, calculatedPayments);
     const monthly = (principal*x*calculatedInterest)/ (x-1);

     if(isFinite(monthly)) {
         monthlyPayment.value = monthly.toFixed(2);
         interest.value = (monthly*calculatedPayments).toFixed(2);
         totalPayment.value = ((monthly * calculatedPayments) - principal).toFixed(2);

         //now show results after 0 sec
         document.querySelector('.container-2').style.display = 'flex';
     } else {
         errorMessage("Please check your numbers");
         
     }
});

//error message
function errorMessage(msg) {
     //intially hide results
     document.querySelector('.container-2').style.display = 'none';
    
     const div = document.createElement('div');
    const container = document.querySelector('#form');
    const insertbefore = document.querySelector('#container-em');
    div.className = "error-msg";
    div.innerHTML = `<p>${msg}</p>`
 
    container.insertBefore(div, insertbefore);

    //clear error
    setTimeout(() => {
      const el = document.querySelector('.error-msg');
       el.remove();
    }, 3000);
}
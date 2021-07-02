import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authenticated-service';
import {IncomeService} from '../service/income-service';
import {Income} from '../model/income';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Expensive } from '../model/expensive';
import { ExpensiveService } from '../service/expensive-service';

@Component({
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']

})
export class HomeComponent  implements OnInit {

  incomes: Income[];
  editIncome: Income;
  deleteIncome: Income;
  expensives: Expensive[];
  editExpensive: Expensive;
  deleteExpensive: Expensive;
  constructor(private expensiveService: ExpensiveService, private incomeService: IncomeService) {
  }

ngOnInit() {
    this.getIncomes();
    this.getExpensives();
}

public getIncomes(): void {
    this.incomeService.getIncomes().subscribe(
        (response: Income[]) => {
           this.incomes = response;
        },
        (error: HttpErrorResponse) => {
            console.log(error.message);
        }
    );
}

public openIncomeModal(income: Income, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addIncome');
  }
  if (mode === 'edit') {
    this.editIncome = income;
    button.setAttribute('data-target', '#editIncome');
  }
  if (mode === 'remove') {
    this.deleteIncome = income;
    button.setAttribute('data-target', '#deleteIncome');
  }
  container.appendChild(button);
  button.click();
}

public onAddIncome(addForm: NgForm): void {
  document.getElementById('add-income-form').click();
  console.log(addForm.value);
  this.incomeService.addIncome(addForm.value).subscribe(
    (response: Income) => {
      this.getIncomes();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}

public onUpdateIncome(income: Income): void {
  this.incomeService.updateIncome(income).subscribe(
    (response: Income) => {
      console.log(response);
      this.getIncomes();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteIncome(incomeId: number): void {
  this.incomeService.deleteIncome(incomeId).subscribe(
    (response: void) => {
      console.log(response);
      this.getIncomes();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public getExpensives(): void {
  this.expensiveService.getExpensives().subscribe(
      (response: Expensive[]) => {
         this.expensives = response;
      },
      (error: HttpErrorResponse) => {
          console.log(error.message);
      }
  );
}

public openExpensiveModal(expensive: Expensive, mode: string): void {
const container = document.getElementById('main-container');
const button = document.createElement('button');
button.type = 'button';
button.style.display = 'none';
button.setAttribute('data-toggle', 'modal');
if (mode === 'add') {
  button.setAttribute('data-target', '#addExpensive');
}
if (mode === 'edit') {
  this.editExpensive = expensive;
  button.setAttribute('data-target', '#editExpensive');
}
if (mode === 'remove') {
  this.deleteExpensive = expensive;
  button.setAttribute('data-target', '#deleteExpensive');
}
container.appendChild(button);
button.click();
}

public onAddExpensive(addForm: NgForm): void {
document.getElementById('add-expensive-form').click();
console.log(addForm.value);
this.expensiveService.addExpensive(addForm.value).subscribe(
  (response: Expensive) => {
    this.getExpensives();
    addForm.reset();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
    addForm.reset();
  }
);
}

public onUpdateExpensive(expensive: Expensive): void {
this.expensiveService.updateExpensive(expensive).subscribe(
  (response: Expensive) => {
    console.log(response);
    this.getExpensives();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);
}

public onDeleteExpensive(expensiveId: number): void {
this.expensiveService.deleteExpensive(expensiveId).subscribe(
  (response: void) => {
    console.log(response);
    this.getExpensives();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);
}

// authenticated() {
//   this.auth.isUserLoggedIn;
// }

}

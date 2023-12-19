import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateHeaderComponent } from './template-header/template-header.component';
import { TemplateSideMenuComponent } from './template-side-menu/template-side-menu.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { GenericScreenComponent } from './generic-screen/generic-screen.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BalanceComponent } from './balance/balance.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomeComponent } from './income/income.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { AllExpensesGraphComponent } from './all-expenses-graph/all-expenses-graph.component';
import { AllExpensesPieChartComponent } from './all-expenses-pie-chart/all-expenses-pie-chart.component';
import { ChartModule } from 'primeng/chart';
import { GridsterModule } from 'angular-gridster2';
import { TemplateBuilderComponent } from './template-builder/template-builder.component';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChipModule } from 'primeng/chip';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    TemplateHeaderComponent,
    TemplateSideMenuComponent,
    GenericScreenComponent,
    InputComponent,
    ButtonComponent,
    TextComponent,
    BalanceComponent,
    ExpensesComponent,
    IncomeComponent,
    StockMarketComponent,
    AllExpensesGraphComponent,
    AllExpensesPieChartComponent,
    LoginComponent,
    TemplateBuilderComponent,
    VerifyOtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    PanelMenuModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    GridsterModule,
    ChartModule,
    DropdownModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    PasswordModule,
    SplitButtonModule,
    ToastModule,
    NgxSpinnerModule,
    ChipModule,
    NgOtpInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

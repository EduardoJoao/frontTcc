import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { DailySalesComponent } from './dashboard-componets/daily-sales/daily-sales.component';
import { WeeklySalesComponent } from './dashboard-componets/weekly-sales/weekly-sales.component';
import { RevenueStaticGraphComponent } from './dashboard-componets/revenue-static-graph/revenue-static-graph.component';
import { ProjectMonthComponent } from './dashboard-componets/project-month/project-month.component';
import { CardsComponent } from './dashboard-componets/cards/cards.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'


const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Dashboard',
			urls: [
				{ title: 'Dashboard', url: '/dashboard' },
				{ title: 'Dashboard' }
			]
		},
		component: DashboardComponent
	}
];

@NgModule({
	imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule, MatSlideToggleModule],
	declarations: [DashboardComponent, DailySalesComponent, WeeklySalesComponent, RevenueStaticGraphComponent, ProjectMonthComponent, CardsComponent]
})
export class DashboardModule {}

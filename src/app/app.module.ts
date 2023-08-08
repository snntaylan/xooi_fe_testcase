import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavModule } from "../@vex/layout/sidenav/sidenav.module";
import { ToolbarModule } from "../@vex/layout/toolbar/toolbar.module";

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // Vex
        VexModule,
        CustomLayoutModule,
        SidenavModule,
        ToolbarModule
    ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../@vex/layout/layout.module';
import { DashboardComponent } from './dashboard.component';
import { SidenavModule } from '../../@vex/layout/sidenav/sidenav.module';
import { ToolbarModule } from '../../@vex/layout/toolbar/toolbar.module';
import { FooterModule } from '../../@vex/layout/footer/footer.module';
import { ConfigPanelModule } from '../../@vex/components/config-panel/config-panel.module';
import { SidebarModule } from '../../@vex/components/sidebar/sidebar.module';
import { QuickpanelModule } from '../../@vex/layout/quickpanel/quickpanel.module';
// import { PageLayoutModule } from '../../@vex/components/page-layout/page-layout.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    QuickpanelModule,
    // PageLayoutModule
  ]
})
export class DashboardModule {
}

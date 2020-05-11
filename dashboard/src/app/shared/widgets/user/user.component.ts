import { Component, OnInit, Input } from "@angular/core";

interface UserItem {
    lastName?: string;
    displayName: string;
    roles?: string[];
    firstName?: string;
    id?: string;
    email: string;
}

@Component({
    selector: "app-widget-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent {
    private _defaultUser: UserItem = {
        displayName: "Not logged in",
        email: "",
    };
    @Input() user: UserItem = this._defaultUser;

    get name() {
        return (this.user || this._defaultUser).displayName;
    }

    get email() {
        return (this.user || this._defaultUser).email;
    }
}

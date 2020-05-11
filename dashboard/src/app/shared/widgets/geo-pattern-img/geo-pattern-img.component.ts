import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import geoPattern from 'geopattern';

/**
 * See https://btmills.github.io/geopattern/ for more information about these
 * images. Expects that the geopattern script has been injected into the
 * window context (probably by including it from a CDN)
 *
 * @export
 * @class GeoPatternImgComponent
 * @implements {OnInit}
 */
@Component({
    selector: "app-widget-geo-pattern-img",
    templateUrl: "./geo-pattern-img.component.html",
    styleUrls: ["./geo-pattern-img.component.scss"],
})
export class GeoPatternImgComponent implements OnInit {
    @Input() src: string = 'unknown';
    @Input() alt: string = null;

    private _avatarUrl: string;

    constructor(private _sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        const pattern = geoPattern.generate(this.src);
        this._avatarUrl = pattern.toDataUri();
    }

    get avatarUrl() {
        return this._sanitizer.bypassSecurityTrustUrl(this._avatarUrl);
    }
}

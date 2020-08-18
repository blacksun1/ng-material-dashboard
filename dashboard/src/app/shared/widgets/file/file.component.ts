import { Component, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import csvtojson from "csvtojson";

const ceil10 = (value: number): number => Math.ceil(value * 10) / 10;

const toDecimalTime = (
    hours: number,
    minutes: number,
    seconds: number
): number => hours + ceil10((minutes + seconds / 60) / 60);

function stringTimeToDecimalTime(value: string) {
    const [hours, minutes, seconds] = value.split(":");

    return toDecimalTime(+hours, +minutes, +seconds);
}

@Component({
    selector: "app-widget-file",
    templateUrl: "./file.component.html",
    styleUrls: ["./file.component.scss"],
})
export class FileComponent implements OnInit {
    @Input()
    file: any;

    isImage = false;
    isTable = false;
    src$ = new Subject();
    formattedSrc$ = this.src$.pipe(
        tap((src) => {
            console.log("src", src);
        }),
        map((results: any[]) => {
            const footer = {
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 0,
                saturday: 0,
                sunday: 0,
            };

            const newResults = results
                .filter((v, i) => i > 0)
                .map((row) => {
                    const id = row.id;
                    const projectCode = row.field4
                        .substr(row.field4.indexOf("(") + 1)
                        .replace(")", "");
                    const projectName = row.field4
                        .substr(0, row.field4.indexOf("("))
                        .trim();
                    const monday = stringTimeToDecimalTime(row.field6);
                    footer.monday += monday;
                    const tuesday = stringTimeToDecimalTime(row.field7);
                    footer.tuesday += tuesday;
                    const wednesday = stringTimeToDecimalTime(row.field8);
                    footer.wednesday += wednesday;
                    const thursday = stringTimeToDecimalTime(row.field9);
                    footer.thursday += thursday;
                    const friday = stringTimeToDecimalTime(row.field10);
                    footer.friday += friday;
                    const saturday = stringTimeToDecimalTime(row.field11);
                    footer.saturday += saturday;
                    const sunday = stringTimeToDecimalTime(row.field12);
                    footer.sunday += sunday;

                    return {
                        id,
                        projectName,
                        projectCode,
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday,
                        sunday,
                    };
                });

            return {
                total:
                    footer.monday +
                    footer.tuesday +
                    footer.wednesday +
                    footer.thursday +
                    footer.friday +
                    footer.saturday +
                    footer.sunday,
                tableData: newResults,
                footer,
            };
        })
    );

    tableDisplayedColumns: string[] = [
        "ProjectName",
        "ProjectCode",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    selectedRowIndex: number = -1;

    constructor() {}

    ngOnInit(): void {
        switch (this.file.type) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
                this.handleImage();
                break;
            case "text/csv":
                this.handleCSV();
                break;
        }
    }

    highlight(row: { id: number }) {
        console.log(row);
        this.selectedRowIndex = row.id;
    }

    private async handleImage() {
        this.isImage = true;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.src$.next(e.target.result);
        };
        reader.readAsDataURL(this.file);
    }

    private handleCSV() {
        this.isTable = true;

        const reader = new FileReader();
        reader.onload = async (e) => {
            if (typeof e.target.result === "string") {
                const result = await this.parseCSV(e.target.result);
                this.src$.next(result);
            }
        };
        reader.readAsText(this.file);
    }

    private async parseCSV(csv: string) {
        const result = csvtojson({ noheader: true })
            .fromString(csv)
        const resolvedResult = await result;

        return resolvedResult.map((row: any, idx: number) => (
            { id: idx, ...row }
        ));
    }
}

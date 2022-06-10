import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    template: ''
})
export abstract class UnsuscribeableComponent implements OnDestroy {

    unsuscriber$ = new Subject<void>();

    ngOnDestroy(): void {
        this.unsuscriber$.next();
        this.unsuscriber$.complete();
        this.unsuscriber$.unsubscribe();
    }
}
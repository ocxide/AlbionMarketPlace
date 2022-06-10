import { TestBed } from "@angular/core/testing"
import { LabelAndPointsService } from "./label-and-points.service"


describe('GraphSevice', () => {
    let service: LabelAndPointsService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(LabelAndPointsService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
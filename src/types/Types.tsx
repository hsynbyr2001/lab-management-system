export interface ReportInitialState {
    reports: ReportType[]
}

export interface ReportType {
    id: number,
    name: string,
    surName: string,
    fileNumber: string,
    fileDate: string,
    tckn: string,
    diagnosticTitle: string,
    diagnosticInfo: string,
    labTechnicianName: string,
    labTechnicianSurname: string,
    labTechnicianId: string,
    image: string
}
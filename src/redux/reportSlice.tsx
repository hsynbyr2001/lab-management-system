import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportInitialState, ReportType } from '../types/Types'

const initialState: ReportInitialState = {
    reports: []
}

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        createReport: (state: ReportInitialState, action: PayloadAction<ReportType>) => {
            state.reports = [...state.reports, action.payload]
        },
        removeReportById: (state: ReportInitialState, action: PayloadAction<number>) => {
            state.reports = [...state.reports.filter((report: ReportType) => report.id !== action.payload)]
        },
        updateReportById: (state: ReportInitialState, action: PayloadAction<ReportType>) => {
            state.reports = [...state.reports.map((report: ReportType) => report.id !== action.payload.id ? report : action.payload)]
        }
    }
})

export const { createReport, removeReportById, updateReportById } = reportSlice.actions
export default reportSlice.reducer
import React, { useState } from 'react'
import Report from './Report'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'
import { ReportType } from '../types/Types'
import { Button, Center, Grid, NativeSelect, TextInput, Title } from '@mantine/core'
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import '../App.css'

function ReportList() {

    const { reports } = useSelector((state: RootState) => state.report)

    const [searchItem, setSearchItem] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('İsim - Soyisim')

    const [isNewestToOldest, setNewestToOldest] = useState<Boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    }

    const handleSorting = () => {
        isNewestToOldest ? setNewestToOldest(false) : setNewestToOldest(true)
    }

    const searchPlaceholder = `${reports.length} rapor listelendi.`

    return (
        <Center>
            <div className='report-list'>
                <Center>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <TextInput
                                        placeholder={searchPlaceholder}
                                        leftSection={<FaSearch />}
                                        value={searchItem}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <NativeSelect
                                        value={searchType}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value)}
                                        data={['İsim - Soyisim', 'TCKN', 'Laborant']}
                                    />
                                </td>
                                <td>
                                    <Button onClick={handleSorting}>{isNewestToOldest ? <FaSortAmountDown /> : <FaSortAmountUp />}</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Center>
                <Grid mt={20}>
                    <Grid.Col span={2}><Title order={4}>İsim</Title></Grid.Col>
                    <Grid.Col span={2}><Title order={4}>Soyisim</Title></Grid.Col>
                    <Grid.Col span={2}><Title order={4}>Tarih</Title></Grid.Col>
                    <Grid.Col span={2}><Title order={4}>TCKN</Title></Grid.Col>
                    <Grid.Col span={2}><Title order={4}>Laborant</Title></Grid.Col>
                </Grid>
                <div style={{ marginBottom: "50px" }}>
                    {
                        reports
                            .filter((report: ReportType) => {
                                switch (searchType) {
                                    case 'İsim - Soyisim':
                                        return searchItem.toLowerCase() === '' ? report : (report.name + " " + report.surName).toLowerCase().includes(searchItem)

                                    case 'TCKN':
                                        return searchItem.toLowerCase() === '' ? report : report.tckn.toLowerCase().includes(searchItem)

                                    case 'Laborant':
                                        return searchItem.toLowerCase() === '' ? report : (report.labTechnicianName + " " + report.labTechnicianSurname).toLowerCase().includes(searchItem)
                                }
                            })
                            .sort(function (a: ReportType, b: ReportType) {
                                if (isNewestToOldest) {
                                    return new Date(a.fileDate).valueOf() - new Date(b.fileDate).valueOf()
                                }
                                else {
                                    return new Date(b.fileDate).valueOf() - new Date(a.fileDate).valueOf()
                                }

                            })
                            .map((report: ReportType) => <Report key={report.id} reportProps={report} />)
                    }
                    <div>
                        <p className='gray-small'>{searchPlaceholder}<br />Hüseyin Bayır tarafından ❤️️ ile yapıldı.</p>
                    </div>
                </div>
            </div>
        </Center >
    )
}

export default ReportList
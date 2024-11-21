import React, { useState } from 'react'
import '../App.css'
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { ReportType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeReportById, updateReportById } from '../redux/reportSlice';
import { Accordion, Button, Grid, Group, Paper, Select, Tabs, Textarea, TextInput, Title } from '@mantine/core';
import { getAllNumbersBetween } from './ReportCreate';

interface ReportProps {
    reportProps: ReportType
}

function Report({ reportProps }: ReportProps) {

    const { id, name, surName, fileNumber, fileDate, tckn, diagnosticTitle, diagnosticInfo, labTechnicianName, labTechnicianSurname, labTechnicianId, image } = reportProps

    const dispatch = useDispatch()

    const [editable, setEditable] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>(name)
    const [newSurName, setNewSurName] = useState<string>(surName)
    const [newFileNumber, setNewFileNumber] = useState<string>(fileNumber)
    const [newFileDate, setNewFileDate] = useState<string>(fileDate)
    const [newTCKN, setNewTCKN] = useState<string>(tckn)
    const [newDiagnosticTitle, setNewDiagnosticTitle] = useState<string>(diagnosticTitle)
    const [newDiagnosticInfo, setNewDiagnosticInfo] = useState<string>(diagnosticInfo)
    const [newLabTechnicianName, setNewLabTechnicianName] = useState<string>(labTechnicianName)
    const [newLabTechnicianSurname, setNewLabTechnicianSurname] = useState<string>(labTechnicianSurname)
    const [newLabTechnicianId, setNewLabTechnicianId] = useState<string>(labTechnicianId)

    const [fileDateYear, setFileDateYear] = useState<string | null>(newFileDate.slice(6, 10))
    const [fileDateMonth, setFileDateMonth] = useState<string | null>(newFileDate.slice(3, 5))
    const [fileDateDay, setFileDateDay] = useState<string | null>(newFileDate.slice(0, 2))

    const handleRemoveReport = () => {
        if (window.confirm("Bu raporu silmek istiyor musunuz? Bu geri alınamaz.")) {
            dispatch(removeReportById(id))
        }
    }

    const checkUpdate = () => {
        if (newFileNumber.trim().length == 0) {
            alert("Dosya numarası giriniz!")
            return false
        }
        else if (!Number(newFileNumber)) {
            alert("Dosya numarası için sadece sayı giriniz!")
            return false
        }
        else if (newName.trim().length == 0) {
            alert("Hasta ismi giriniz!")
            return false
        }
        else if (newSurName.trim().length == 0) {
            alert("Hasta soy ismi giriniz!")
            return false
        }
        else if (newTCKN.trim().length == 0) {
            alert("TCKN giriniz!")
            return false
        }
        else if (!Number(newTCKN)) {
            alert("TCKN için sadece sayı giriniz!")
            return false
        }
        else if (newTCKN.trim().length != 11) {
            alert("TCKN için " + newTCKN.trim().length + " hane girdiniz. TCKN 11 haneli olmalıdır!")
            return false
        }
        if (newDiagnosticTitle.trim().length == 0) {
            alert("Tanı başlığı giriniz!")
            return false
        }
        else if (newDiagnosticInfo.trim().length == 0) {
            alert("Tanı bilgileri giriniz!")
            return false
        }
        else if (newLabTechnicianName.trim().length == 0) {
            alert("Laborant ismi giriniz!")
            return false
        }
        else if (newLabTechnicianSurname.trim().length == 0) {
            alert("Laborant soy ismi giriniz!")
            return false
        }
        else if (newLabTechnicianId.trim().length == 0) {
            alert("Laborant kimlik numarası giriniz!")
            return false
        }
        else if (!Number(newLabTechnicianId)) {
            alert("Laborant kimlik numarası için sadece sayı giriniz!")
            return false
        }
        else if (newLabTechnicianId.trim().length != 7) {
            alert("Laborant kimlik numarası için " + newLabTechnicianId.trim().length + " hane girdiniz. Laborant kimlik numarası 7 haneli olmalıdır!")
            return false
        }
        else {
            return true
        }
    }

    const handleUpdateReport = () => {

        if (checkUpdate()) {
            const payload = {
                id: id,
                name: newName,
                surName: newSurName,
                fileNumber: newFileNumber,
                fileDate: fileDateDay + "/" + fileDateMonth! + "/" + fileDateYear!,
                tckn: newTCKN,
                diagnosticTitle: newDiagnosticTitle,
                diagnosticInfo: newDiagnosticInfo,
                labTechnicianName: newLabTechnicianName,
                labTechnicianSurname: newLabTechnicianSurname,
                labTechnicianId: newLabTechnicianId,
                image: imageToSave
            }

            dispatch(updateReportById(payload))
            setEditable(false)
            updateDate()

            alert("Rapor güncellendi.")
        }
    }

    const updateDate = () => {
        setNewFileDate(fileDateDay + "/" + fileDateMonth! + "/" + fileDateYear!)
    }

    const [imageToSave, setImageToSave] = useState<string>(image)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (fileList && fileList.length > 0) {

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToSave(reader.result as string)
            };
            reader.readAsDataURL(fileList[0]);

        }
    };

    const removeImage = () => {
        setImageToSave('')
        alert('Fotoğraf kaldırıldı.')
    }

    return (
        <Accordion>
            <Accordion.Item value={newName}>
                <Accordion.Control>
                    <Grid>
                        <Grid.Col span={2}>{newName}</Grid.Col>
                        <Grid.Col span={2}>{newSurName}</Grid.Col>
                        <Grid.Col span={2}>{newFileDate}</Grid.Col>
                        <Grid.Col span={2}>{newTCKN}</Grid.Col>
                        <Grid.Col span={2}>{newLabTechnicianName + " " + newLabTechnicianSurname}</Grid.Col>
                    </Grid>
                </Accordion.Control>
                <Accordion.Panel>
                    <Paper shadow="md" p="md" pl={250} pr={250}>
                        <Title order={2} mt={20}>Rapor Detayları
                            {editable ?
                                <Button size='xs' ml={10} onClick={handleUpdateReport}><FaCheckCircle style={{ fontSize: '15px' }} /></Button> :
                                <Button size='xs' ml={10} onClick={() => setEditable(true)}><MdEdit style={{ fontSize: '18px' }} /></Button>}
                            <Button onClick={handleRemoveReport} size='xs' ml={10}><MdDeleteForever fontSize={20} /></Button>
                        </Title>
                        <p className='gray-small'><b>Dosya Numarası:</b> {editable ? <TextInput value={newFileNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFileNumber(e.target.value)} /> : <b>{newFileNumber}</b>}</p>

                        {editable ?
                            <div>
                                <Grid>
                                    <Grid.Col span={4}>
                                        {editable ? <TextInput label="Hasta İsmi" value={newName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)} /> : <div></div>}
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {editable ? <TextInput label="Hasta Soy İsmi" value={newSurName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSurName(e.target.value)} /> : <div></div>}
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {editable ? <TextInput label="TCKN" value={newTCKN} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTCKN(e.target.value)} /> : <div></div>}
                                    </Grid.Col>
                                </Grid>
                                <Grid>
                                    <Grid.Col span={4}>
                                        {editable ? <TextInput label="Laborant İsmi" value={newLabTechnicianName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabTechnicianName(e.target.value)} /> : <div></div>}
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {editable ? <TextInput label="Laborant Soy İsmi" value={newLabTechnicianSurname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabTechnicianSurname(e.target.value)} /> : <div></div>}
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {editable ? <TextInput label="Laborant Numarası" value={newLabTechnicianId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabTechnicianId(e.target.value)} /> : <div></div>}
                                    </Grid.Col>
                                </Grid>
                                <Grid>
                                    <Grid.Col span={4}>
                                        <Select
                                            label="Gün"
                                            placeholder="Gün"
                                            data={getAllNumbersBetween(1, 30)}
                                            defaultValue={newFileDate.slice(0, 2)}
                                            allowDeselect={false}
                                            onChange={(e: string | null) => { setFileDateDay(e) }}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <Select
                                            label="Ay"
                                            placeholder="Ay"
                                            data={getAllNumbersBetween(1, 12)}
                                            defaultValue={newFileDate.slice(3, 5)}
                                            allowDeselect={false}
                                            onChange={(e: string | null) => { setFileDateMonth(e) }}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <Select
                                            label="Yıl"
                                            placeholder="Yıl"
                                            data={getAllNumbersBetween(1900, 2025)}
                                            defaultValue={newFileDate.slice(6, 10)}
                                            allowDeselect={false}
                                            onChange={(e: string | null) => { setFileDateYear(e) }}
                                        />

                                    </Grid.Col>
                                </Grid>
                            </div> :
                            <div></div>}

                        <Tabs defaultValue="tani" mt={20}>
                            <Tabs.List grow>
                                <Tabs.Tab value="tani">
                                    <Title order={5}>Tanı</Title>
                                </Tabs.Tab>
                                <Tabs.Tab value="technician">
                                    <Title order={5}>Laborant</Title>
                                </Tabs.Tab>
                                <Tabs.Tab value="settings">
                                    <Title order={5}>Fotoğraf</Title>
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="tani">
                                <div><p className='report-header'><b>Tanı</b></p> {editable ? <TextInput value={newDiagnosticTitle} mt={10} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDiagnosticTitle(e.target.value)} /> : <p className='gray-middle'>{newDiagnosticTitle}</p>}</div>
                                <div><p className='report-header'><b>Tanı bilgileri</b></p> {editable ? <Textarea value={newDiagnosticInfo} mt={10} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDiagnosticInfo(e.target.value)} autosize /> : <p className='gray-middle'>{newDiagnosticInfo}</p>}</div>
                            </Tabs.Panel>

                            <Tabs.Panel value="technician">
                                <p className='report-header'><b>Laborant Bilgileri</b></p>
                                <div>
                                    <p className='gray-middle'>
                                        {newLabTechnicianName + " " + newLabTechnicianSurname} <b>{" " + labTechnicianId}</b>
                                    </p>
                                </div>
                            </Tabs.Panel>

                            <Tabs.Panel value="settings">
                                <p className='report-header'><b>Fotoğraf Eki</b></p>
                                {editable ?
                                    <div>
                                        <input id="file-upload" type='file' accept=".png, .jpg" onChange={handleFileChange}
                                            style={{ marginBottom: "25px", marginTop: "25px" }} />
                                        <Button mb={20} onClick={removeImage}>Fotoğrafı Kaldır</Button>
                                    </div> :
                                    <div></div>}
                                {image ? <Group mt={20} mb={20}><img src={image} width={420} /></Group> : <p className='gray-middle'>Fotoğraf eki yok.</p>}
                            </Tabs.Panel>
                        </Tabs>

                    </Paper>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion >
    )
}

export default Report

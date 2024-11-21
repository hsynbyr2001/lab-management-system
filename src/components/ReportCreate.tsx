import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReport } from '../redux/reportSlice'
import { RootState } from '@reduxjs/toolkit/query'
import { ReportType } from '../types/Types'
import ImagePreview from './ImagePreview'
import { Modal, Button, TextInput, Center, Textarea, Select, Grid, Title, Paper, Stepper, Group } from '@mantine/core'
import { FaCheck, FaPlus } from 'react-icons/fa'

function reportCreate() {

    const dispatch = useDispatch()

    const { reports } = useSelector((state: RootState) => state.report)

    const [newName, setNewName] = useState<string>('')
    const [newSurName, setNewSurName] = useState<string>('')
    const [newFileNumber, setNewFileNumber] = useState<string>('')
    const [newTCKN, setNewTCKN] = useState<string>('')
    const [newDiagnosticTitle, setNewDiagnosticTitle] = useState<string>('')
    const [newDiagnosticInfo, setNewDiagnosticInfo] = useState<string>('')
    const [newLabTechnicianName, setNewLabTechnicianName] = useState<string>('')
    const [newLabTechnicianSurname, setNewLabTechnicianSurname] = useState<string>('')
    const [newLabTechnicianId, setNewLabTechnicianId] = useState<string>('')

    const [fileDateYear, setFileDateYear] = useState<string | null>('2024')
    const [fileDateMonth, setFileDateMonth] = useState<string | null>('01')
    const [fileDateDay, setFileDateDay] = useState<string | null>('01')

    const [opened, setOpened] = useState(false);

    const handleCreateReport = () => {
        if (checkStepOne() && checkStepTwo() && checkStepThree()) {
            const payload: ReportType = {
                id: Math.floor(Math.random() * 999999999),
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

            dispatch(createReport(payload))
            setNewName('')
            setNewSurName('')
            setNewFileNumber('')
            setFileDateDay('01')
            setFileDateMonth('01')
            setFileDateYear('2024')
            setNewTCKN('')
            setNewDiagnosticTitle('')
            setNewDiagnosticInfo('')
            setNewLabTechnicianName('')
            setNewLabTechnicianSurname('')
            setNewLabTechnicianId('')
            setImageToSave('')
            setFile(null);
            (document.getElementById("file-upload") as HTMLInputElement).value = ""
            setOpened(false)
        }
    }

    const [file, setFile] = useState<File | null>(null);

    const [imageToSave, setImageToSave] = useState<string>('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (fileList && fileList.length > 0) {
            setFile(fileList[0]);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToSave(reader.result as string)
            };
            reader.readAsDataURL(fileList[0]);

        } else {
            setFile(null);
        }
    };

    const checkStepOne = () => {
        if (newFileNumber.trim().length == 0) {
            alert("Dosya numarası giriniz!")
        }
        else if (!Number(newFileNumber)) {
            alert("Dosya numarası için sadece sayı giriniz!")
        }
        else if (reports.find((report: ReportType) => report.fileNumber === newFileNumber) !== undefined) {
            alert("Bu dosya numarası daha önce bir laborant tarafından sisteme kaydedilmiş. Lütfen farklı dosya numarası giriniz.")
        }
        else if (newName.trim().length == 0) {
            alert("Hasta ismi giriniz!")
        }
        else if (newSurName.trim().length == 0) {
            alert("Hasta soy ismi giriniz!")
        }
        else if (newTCKN.trim().length == 0) {
            alert("TCKN giriniz!")
        }
        else if (!Number(newTCKN)) {
            alert("TCKN için sadece sayı giriniz!")
        }
        else if (newTCKN.trim().length != 11) {
            alert("TCKN için " + newTCKN.trim().length + " hane girdiniz. TCKN 11 haneli olmalıdır!")
        }
        else {
            return true
        }
    }

    const checkStepTwo = () => {
        if (newDiagnosticTitle.trim().length == 0) {
            alert("Tanı başlığı giriniz!")
        }
        else if (newDiagnosticInfo.trim().length == 0) {
            alert("Tanı bilgileri giriniz!")
        }
        else {
            return true
        }
    }

    const checkStepThree = () => {
        if (newLabTechnicianName.trim().length == 0) {
            alert("Laborant ismi giriniz!")
        }
        else if (newLabTechnicianSurname.trim().length == 0) {
            alert("Laborant soy ismi giriniz!")
        }
        else if (newLabTechnicianId.trim().length == 0) {
            alert("Laborant kimlik numarası giriniz!")
        }
        else if (!Number(newLabTechnicianId)) {
            alert("Laborant kimlik numarası için sadece sayı giriniz!")
        }
        else if (newLabTechnicianId.trim().length != 7) {
            alert("Laborant kimlik numarası için " + newLabTechnicianId.trim().length + " hane girdiniz. Laborant kimlik numarası 7 haneli olmalıdır!")
        }
        else {
            return true
        }
    }

    const [stepperActive, setStepperActive] = useState(0);

    const nextStep = () => {

        switch (stepperActive) {
            case 0:
                if (checkStepOne()) {
                    setStepperActive((current) => (current < 4 ? current + 1 : current));
                    break
                }
                else {
                    break
                }

            case 1:

                if (checkStepTwo()) {
                    setStepperActive((current) => (current < 4 ? current + 1 : current));
                    break
                }
                else {
                    break
                }

            case 2:

                if (checkStepThree()) {
                    setStepperActive((current) => (current < 4 ? current + 1 : current));
                    break
                }
                else {
                    break
                }

            case 3:
                setStepperActive((current) => (current < 4 ? current + 1 : current));
        }
    }

    const prevStep = () => setStepperActive((current) => (current > 0 ? current - 1 : current));

    return (

        <div>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                styles={{
                    content: {
                        backgroundColor: '#fafafa',
                    },
                    header: {
                        backgroundColor: '#fafafa',
                    },
                }}
                size="xl"
                centered>
                {
                    <div>
                        <div>
                            <div>
                                <Title order={1}>Yeni Rapor</Title>
                                <Stepper active={stepperActive} onStepClick={setStepperActive} mt={40}>
                                    <Stepper.Step label="Rapor" description="Hasta Bilgileri">
                                        <Paper shadow="md" p="md" mt={40}>
                                            <Title order={4}>Rapor ve Hasta Bilgileri</Title>
                                            <Grid>
                                                <Grid.Col span={4}>
                                                    <TextInput
                                                        value={newFileNumber}
                                                        label="Dosya Numarası"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFileNumber(e.target.value)}
                                                        className='report-input'
                                                        type="text"
                                                        placeholder='Dosya Numarası'
                                                        data-autofocus />
                                                </Grid.Col>
                                                <Grid.Col span={4}><TextInput
                                                    value={newName}
                                                    label="Hasta İsmi"
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                                                    className='report-input'
                                                    type="text"
                                                    placeholder='Hasta İsmi' /></Grid.Col>
                                                <Grid.Col span={4}><TextInput value={newSurName}
                                                    label="Hasta Soy İsmi"
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSurName(e.target.value)}
                                                    className='report-input'
                                                    type="text"
                                                    placeholder='Hasta Soy İsmi' /></Grid.Col>
                                            </Grid>
                                            <Grid>
                                                <Grid.Col span={3}>
                                                    <TextInput value={newTCKN}
                                                        label="Hasta TCKN"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTCKN(e.target.value)}
                                                        className='report-input'
                                                        type="text"
                                                        placeholder='11 Haneli' />
                                                </Grid.Col>
                                                <Grid.Col span={3}>
                                                    <Select
                                                        label="Yıl"
                                                        placeholder="Yıl"
                                                        data={getAllNumbersBetween(1900, 2024)}
                                                        defaultValue={fileDateYear}
                                                        allowDeselect={false}
                                                        onChange={(e: string | null) => setFileDateYear(e)}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={3}>
                                                    <Select
                                                        label="Ay"
                                                        placeholder="Ay"
                                                        data={getAllNumbersBetween(1, 12)}
                                                        defaultValue={fileDateMonth}
                                                        allowDeselect={false}
                                                        onChange={(e: string | null) => setFileDateMonth(e)}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={3}>
                                                    <Select
                                                        label="Gün"
                                                        placeholder="Gün"
                                                        data={getAllNumbersBetween(1, 30)}
                                                        defaultValue={fileDateDay}
                                                        allowDeselect={false}
                                                        onChange={(e: string | null) => setFileDateDay(e)}
                                                    />
                                                </Grid.Col>
                                            </Grid>
                                        </Paper>
                                    </Stepper.Step>
                                    <Stepper.Step label="Tanı" description="Tanı Bilgileri">
                                        <Paper shadow="md" p="md" mt={40}>
                                            <Title order={4}>Tanı Bilgileri</Title>
                                            <TextInput value={newDiagnosticTitle}
                                                label="Tanı başlığı"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDiagnosticTitle(e.target.value)}
                                                className='report-input'
                                                type="text"
                                                placeholder='Tanı başlığı' />

                                            <Textarea
                                                value={newDiagnosticInfo}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDiagnosticInfo(e.target.value)}
                                                placeholder="Tanı bilgileri"
                                                label="Tanı bilgileri"
                                                autosize
                                                minRows={3}
                                            />
                                        </Paper>
                                    </Stepper.Step>
                                    <Stepper.Step label="Laborant" description="Görevli Kimliği">
                                        <Paper shadow="md" p="md" mt={40}>
                                            <Title order={4}>Laborant Bilgileri</Title>
                                            <Grid>
                                                <Grid.Col span={4}>
                                                    <TextInput value={newLabTechnicianName}
                                                        label="Laborant ismi"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabTechnicianName(e.target.value)}
                                                        className='report-input'
                                                        type="text"
                                                        placeholder='Laborant ismi' />
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                    <TextInput value={newLabTechnicianSurname}
                                                        label="Laborant soy ismi"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabTechnicianSurname(e.target.value)}
                                                        className='report-input'
                                                        type="text"
                                                        placeholder='Laborant soy ismi' />
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                    <TextInput value={newLabTechnicianId}
                                                        label="Kimlik numarası"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabTechnicianId(e.target.value)}
                                                        className='report-input'
                                                        type="text"
                                                        placeholder='7 Haneli' />
                                                </Grid.Col>
                                            </Grid>
                                        </Paper>
                                    </Stepper.Step>
                                    <Stepper.Step label="Fotoğraf" description="Tanı eki">
                                        <Paper shadow="md" p="md" mt={40}>
                                            <Title order={4}>Fotoğraf Eki (png veya jpg)</Title>
                                            <input id="file-upload" type='file' accept=".png, .jpg" onChange={handleFileChange}
                                                style={{ marginBottom: "25px" }} />
                                            <ImagePreview file={file} />
                                        </Paper>
                                    </Stepper.Step>
                                    <Stepper.Completed>
                                        Rapor oluşturuldu.
                                    </Stepper.Completed>
                                </Stepper>
                                <Group justify="center" mt="xl">
                                    <Button variant="default" onClick={prevStep}>Geri</Button>
                                    {stepperActive === 3 ?
                                        <div>
                                            <Button variant="filled" onClick={handleCreateReport} leftSection={<FaCheck />} fullWidth>Oluştur</Button>
                                        </div>
                                        :
                                        <div>
                                            <Button onClick={nextStep}>İleri</Button>
                                        </div>
                                    }

                                </Group>
                            </div>
                            <div>

                            </div>
                        </div>

                    </div>
                }
            </Modal>
            <Center>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Title order={1} m={25}>Laboratuvar Rapor Listesi</Title>
                            </td>
                            <td><Button onClick={() => { setOpened(true); setFile(null); setStepperActive(0) }} ><FaPlus /></Button></td>
                        </tr>
                    </tbody>
                </table>
            </Center>
        </div>
    )
}

export function getAllNumbersBetween(x: number, y: number) {
    var numbers: string[] = [];
    for (var i = x; i <= y; i++) {
        numbers.push(i < 10 ? "0" + i.toString() : i.toString());
    }
    return numbers.reverse();
}

export default reportCreate
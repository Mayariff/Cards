import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './ProfilePage.module.css'
import Paper from "@mui/material/Paper";
import {useAppSelector} from "../../bll/store";
import {addPackTC, PackType, setPacksAT} from "../../bll/reducers/packReducer";
import {ParamsPackType} from "../../dal/packsApi";
import {RequestStatusType, setAppErrorAC} from "../../bll/reducers/appReducer";
import {useDispatch} from "react-redux";
import {Slider} from "@mui/material";
import {useDebounce} from "../../utilities/UseDebounce";
import {Search} from "../8 Helpers & Visual Components/8.1 TableHelpers/8.1.2 Search from word/Search";
import {compose} from "redux";
import {withAuthRedirect} from "../../bll/HOK/withAuthRedirect";
import PacksTable from "../3 PacksTable & Settings/3.1 PacksTable/PacksTable";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import {Modal} from "../7 CommonComponents/7.2 Modal/Modal";
import {AddPack} from "../7 CommonComponents/7.2 Modal/7.2.2 PacksModals/AddPack";


const ProfilePage = () => {

    const dispatch = useDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    const userProfileID = useAppSelector<string>(state => state.Profile._id)
    const name = useAppSelector<string>(state => state.Profile.name)
    const status = useAppSelector<RequestStatusType>(store => store.App.status)


    const userPacks = packs.filter(p => p.user_id === userProfileID)


    //локал стейты для пагинатора
    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице
    //обработчики для пагинации
    const onPageChanged = (page: number) => setCurrentPage(page)
    const countItemsChanged = (pageCount: number) => setPageCount(pageCount)

    //для слайдера
    const [sliderValue, setSliderValue] = useState<number[]>([0, 100])
    //обработчик для изменения бегунков слайдера
    const sliderHandler = (event: Event, newValue: number | number[]) => setSliderValue(newValue as number[]);

    //для инпута (чтоб найти имя колоды)
    const [packName, setPackName] = useState<string>('')
    //обработчик для изменения инпута
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setPackName(e.target.value)

    //задержки от лишних запросов на сервер
    const debouncedMin = useDebounce(sliderValue[0], 500)
    const debouncedMax = useDebounce(sliderValue[1], 500)
    const debouncedPackName = useDebounce(packName, 500)

    //модалки
    const [addModal, setAddModal] = useState(false);
    //закрыть модалку
    const handleClickAddPack = () => {
        setAddModal(true)
    }
    const closeModal = () => {
        setAddModal(false)
    }
    const addPack = (text: string) => {
        if (text.length) {
            dispatch(addPackTC(params, text))
            setAddModal(false)
        }
    }

    const title = name !== '' ? `Packs list of ${name}` : `My Packs list`

    const params: ParamsPackType = {
        packName,
        min: sliderValue[0],
        max: sliderValue[1],
        page: currentPage,
        pageCount,
        user_id: userProfileID  //передаем id человека, чью колоду показать
    }

    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setPacksAT(params))
    }, [dispatch, currentPage, pageCount, isInitialized, debouncedMin, debouncedMax, debouncedPackName])


    return (
        <Paper className={style.container}>
            <div className={style.leftMenu}>
                <ProfileInfo/>
                <div className={style.settingMenu}>
                    <span className={style.text}>Number of cards</span>
                    <Slider value={sliderValue}
                            onChange={sliderHandler}
                            getAriaLabel={() => 'Temperature range'}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            color="secondary"/>
                </div>
            </div>

            <div className={style.main}>
                <div className={style.headBlock}>
                    <h2 className={style.header}>{title}</h2>
                    <div className={style.settings}>
                        <Search searchValue={packName} onChangeSearch={onChangeSearch}/>
                        <Button variant="outlined" color={'secondary'} disabled={status === 'loading'}
                                startIcon={<ControlPointIcon/>}
                                onClick={handleClickAddPack}>
                            Add Pack
                        </Button>
                    </div>
                </div>
                <div className={style.mainContent}>
                    <PacksTable params={params}
                                onPageChanged={onPageChanged}
                                countItemsChanged={countItemsChanged}
                                packs={userPacks}/>
                </div>
            </div>
            <Modal isOpen={addModal} closeModal={closeModal}>
                <AddPack showAdd={setAddModal} addPack={addPack}/>
            </Modal>
        </Paper>
    );
};

export default compose(withAuthRedirect)(ProfilePage);

function valuetext(value: number) {
    return `${value}°C`;
}
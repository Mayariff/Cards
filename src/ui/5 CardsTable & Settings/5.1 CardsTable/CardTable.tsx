import React, {useState} from 'react';
import Table from "@mui/material/Table";
import {TableBody, TableContainer} from "@mui/material";
import {CardType, changeCardTC, deleteCardTC} from "../../../bll/reducers/cardReducer";
import Card from "./5.1.1 Card/Card";
import Pagenator from "../../7 CommonComponents/7.3 Pagenator/Pagenator";
import {DeleteModal} from "../../7 CommonComponents/7.2 Modal/7.2.1 CommonModals/DeleteModal";
import {Modal} from "../../7 CommonComponents/7.2 Modal/Modal";
import {UpdateCard} from "../../7 CommonComponents/7.2 Modal/7.2.3 CardsModals/UpdateCard";
import {useDispatch} from "react-redux";
import {CardFromServerType, ParamsCardType} from "../../../dal/cardsApi";
import {useAppSelector} from "../../../bll/store";
import {TableHeader} from "../../8 Helpers & Visual Components/8.1 TableHelpers/8.1.1 TableHeader/TableHeader";
import Paper from "@mui/material/Paper";


type propsType={
    cards: CardType[]
    params: ParamsCardType
    onPageChanged:(page: number) => void
    countItemsChanged: (pageCount: number) => void
}

const CardTable = ({cards,params,...props}:propsType) => {
    const dispatch = useDispatch()
    const cardsTotalCount = useAppSelector<number>(state => state.Cards.cardsTotalCount)
    //модалки
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    //закрыть модалку
    const closeUpdateModal = () => {
        setUpdateModal(false)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    // хранение id карточки для модалки
    const [cardId, setCardId] = useState('')
    // хранение значения полей ввода для редактирования
    const [card, setCard] = useState<CardFromServerType>({})

    const handleClickDeleteCard = (cardId: string) => {
        setCardId(cardId)
        setDeleteModal(true)
    }
    const deleteCard = () => {
        dispatch(deleteCardTC(cardId, params))
        setDeleteModal(false);}

        const handleClickEditCard = (cardId: string, card: CardFromServerType) => {
            setCardId(cardId)
            setCard(card)
            setUpdateModal(true)
        }
        const editCard = (card: CardFromServerType) => {
            dispatch(changeCardTC(cardId, card, params))
            setUpdateModal(false)
        }


    return (
        <>
            <Paper sx={{ width: 780, overflow: 'hidden', boxShadow: 3}}>
                <TableContainer sx={{ maxHeight: 422 }}>
                    <Table stickyHeader aria-label="sticky table"  >
                        <TableHeader names={['Question', 'Answer','Last Updated', 'Grade', 'Actions']} />
                        <TableBody>
                            {cards.map((card: CardType,index) => {
                                return <Card key={`${card.user_id}+${card.created}+${card.updated}`}
                                             card={card}
                                             delete={handleClickDeleteCard}
                                             edit={handleClickEditCard}
                                             index={index}
                                />
                            })}
                        </TableBody>
                    </Table>

                </TableContainer>
            </Paper>



            <Pagenator currentPage={params.page}
                       countItemsOnPage={params.pageCount}
                       totalItems={cardsTotalCount}
                       onPageChanged={props.onPageChanged}
                       countItemsOnPageChanged={props.countItemsChanged}
            />
            { /*//modal*/}
            <Modal isOpen={deleteModal} closeModal={closeDeleteModal}>
                <DeleteModal showDelete={setDeleteModal} deleteFunction={deleteCard}/>
            </Modal>
            <Modal isOpen={updateModal} closeModal={ closeUpdateModal}>
                <UpdateCard showUpdate={setUpdateModal} updateCard={editCard} answer={card.answer}
                            question={card.question}/>
            </Modal>
        </>
    );
};

export default CardTable;



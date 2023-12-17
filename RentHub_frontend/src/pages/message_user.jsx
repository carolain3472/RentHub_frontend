import React, { useState, useEffect } from 'react';
import { Nav_bar_inicio } from '../components/Nav_bar_inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/message_user.css';
import axios from "axios";
import { api } from "../api/register_api";


export function Message_user() {
    // Estado para gestionar la lista de chats

    const id_user = 3

    const [chats, setChats] = useState([]);

    const [conversations, setConversations] = useState([]);

    // Estado para gestionar el chat seleccionado
    const [selectedChat, setSelectedChat] = useState(null);

    const [idOtherUser, setidOtherUser] = useState(null);

    const [nameOtherUser, setnameOtherUser] = useState(null);

    const [lastnameOtherUser, setlastnameOtherUser] = useState(null);

    // Estado para el mensaje que el usuario está escribiendo
    const [newMessage, setNewMessage] = useState('');

    // Actualizar chats

    const [shouldRefreshChat, setshouldRefreshChat] = useState(false);

    const [deleteChat, setDeleteChat] = useState(false)


    // Estado para almacenar la cadena de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Efecto para cargar los chats al montar el componente
    useEffect(() => {
        // Realiza la solicitud HTTP para obtener los chats
        if (searchTerm == '') {
            api
                .post('chat/myMessages/', { "user_id": id_user })
                .then(response => {
                    // Actualiza el estado con los datos de la respuesta
                    setChats(response.data.mensajes);
                })
                .catch(error => {
                    console.error('Error al obtener los chats:', error);
                });

        }

    });


    // Nuevo estado para indicar cuándo se debe enviar el mensaje
    const [shouldSendMessage, setShouldSendMessage] = useState(false);

    // Función para manejar el clic en el botón "Enviar"
    const handleSendMessageClick = () => {
        // Actualiza el estado para indicar que se debe enviar el mensaje
        setShouldSendMessage(true);
    };

    // Efecto para enviar el mensaje cuando shouldSendMessage es true
    useEffect(() => {
        // Verifica si se debe enviar el mensaje
        if (shouldSendMessage) {
            // Realiza la solicitud HTTP para enviar el mensaje
            api
                .post('chat/sendMessages/', { user: id_user, sender: id_user, receiver: idOtherUser, message: newMessage })
                .then(response => {
                    // Actualiza el estado con los datos de la respuesta
                    console.log('Se envió el mensaje correctamente');

                    // Limpia el campo de texto después de enviar el mensaje
                    setNewMessage('');

                    // Restablece el estado para que no se envíe el mensaje nuevamente
                    setShouldSendMessage(false);
                    setshouldRefreshChat(true)
                })
                .catch(error => {
                    console.error('Error al enviar mensaje:', error);
                });
        }
    }, [shouldSendMessage, id_user, idOtherUser, newMessage]);

    //CONVERSACIONES

    // Efecto para cargar las conversaciones al seleccionar un chat
    useEffect(() => {
        // Verifica si hay un chat seleccionado
        if (selectedChat || shouldRefreshChat) {
            // Realiza la solicitud HTTP para obtener las conversaciones
            api
                .get(`/chat/getMessages/${id_user}/${idOtherUser}/`)
                .then(response => {
                    // Actualiza el estado con los datos de la respuesta
                    setConversations(response.data);
                    setshouldRefreshChat(false)
                })
                .catch(error => {
                    console.error('Error al obtener las conversaciones:', error);
                });
        }
    }, [selectedChat, shouldRefreshChat, idOtherUser, id_user]);





    // Efecto para realizar la búsqueda cuando el usuario hace clic en el botón "Buscar"
    useEffect(() => {
        // Verifica si se debe realizar la búsqueda
        if (searchTerm) {
            // Realiza la solicitud HTTP para buscar chats
            api
                .post('/chat/filterMessages/', { "user_id": id_user, "filter": searchTerm })
                .then(response => {
                    // Actualiza el estado con los datos de la respuesta
                    setChats(response.data.mensajes);
                })
                .catch(error => {
                    console.error('Error al buscar chats:', error);
                })
        }
    }, [searchTerm]);


    //ELIMINAR UN CHAT

    useEffect(() => {
        // Verifica si se debe realizar la búsqueda
        if (deleteChat) {
            // Realiza la solicitud HTTP para buscar chats
            api
                .post(`/chat/deleteMessages/${id_user}/${idOtherUser}/`)
                .then(response => {
                    // Actualiza el estado con los datos de la respuesta
                    setDeleteChat(false)
                    console.log("Se eliminaron bien los mensajes")
                })
                .catch(error => {
                    console.error('Error al eliminar chats:', error);
                });
        }
    }, [deleteChat]);

    return (
        <>
            <Nav_bar_inicio />
            <div className="container-fluid chat-container">
                <div className="row">
                    <div className="col-md-4 chat-list">
                        <h4>Chats</h4>
                        {/* Barra de búsqueda */}
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar chat"
                                aria-label="Buscar chat"
                                aria-describedby="basic-addon2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <ul className="list-group">
                            {chats.map(chat => (
                                <li
                                    key={chat.id}
                                    className={`list-group-item ${selectedChat === chat.id ? 'custom-active' : ''}`}
                                    onClick={() => {
                                        setSelectedChat(chat.id);
                                        setidOtherUser(id_user == chat.id_sender ? chat.id_receiver : chat.id_sender);
                                        setnameOtherUser(id_user == chat.id_sender ? chat.name_receiver : chat.name_sender);
                                        setlastnameOtherUser(id_user == chat.id_sender ? chat.last_name_receiver : chat.last_name_sender);
                                    }}
                                >
                                    <strong>
                                        {id_user == chat.id_sender ? chat.name_receiver + " " + chat.last_name_receiver : chat.name_sender + " " + chat.last_name_sender}
                                    </strong>
                                    <p>Último mensaje: {chat.texto}</p>

                                    {/* Estructura condicional para mostrar el botón solo si el chat está seleccionado */}
                                    {selectedChat === chat.id && (
                                        <button style={{
                                            width: '2.2vw',
                                            height: '2.2vw',
                                            margin: 0,
                                            padding: 0,
                                            // Otros estilos que desees agregar
                                        }} className="boton-delete-chat" onClick={() => setDeleteChat(true)}>
                                            <img src="/images/borrar.png" alt="Eliminar" style={{ width: '2vw', height: '2vw' }} />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>


                    </div>

                    {/* Espacio para mostrar los mensajes en la izquierda */}
                    <div className="col-md-8 messages d-flex flex-column" style={{ height: '100%' }}>
                        <div className="flex-grow-1 overflow-auto">
                            <h4>Mensajes</h4>

                            {selectedChat ? (
                                <div>
                                    <p>Mensajes con {nameOtherUser + " " + lastnameOtherUser}</p>

                                    {/* Logica para mensajes de la conversación */}
                                    <div className="messages-container">
                                        {conversations.map(conversation => (
                                            <div
                                                key={conversation.id}
                                                className={`message ${conversation.sender.id === 3 ? 'right' : 'left'}`}
                                            >
                                                <p>{conversation.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p>Selecciona un chat para ver los mensajes.</p>
                            )}

                        </div>

                        {/* Área para escribir y enviar mensajes (condicional) */}
                        {selectedChat && (
                            <div className="mt-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Escribe tu mensaje..."
                                    className="form-control"
                                />
                                <button onClick={() => setShouldSendMessage(true)} className="btn btn-custom btn-primary mt-2">Enviar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

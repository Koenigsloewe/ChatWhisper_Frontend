import { apiSlice } from "../services/apiSlice";

interface uuid {
    uuid: string;
}

const chatApiSlice = apiSlice.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getInstruction: builder.query<string, void>({
            query: () => ({
                url: '/api/chatbot/instruction/',
                method: 'GET',
            }),
            transformResponse: (response: { instruction: string }) => response.instruction,
        }),
        setInstruction: builder.mutation({
            query: ({inputInstruction}) => ({
                url: '/api/chatbot/instruction/',
                method: 'POST',
                body: { instruction: inputInstruction },
            }),
        }),
        createConversation: builder.mutation({
            query: ({name}) => ({
                url: '/api/chatbot/chat/conversation/',
                method: 'POST',
                body: {name},
            }),
            invalidatesTags: ['Conversations'], 
        }),
        sendInput: builder.mutation({
            query: ({ uuid, inputData}) => ({
                url: `/api/chatbot/chat/conversation/${uuid}/process_input/`,
                method: 'POST',
                body: {inputData},
            }),
        }),
        getChatHistory: builder.query<any, {uuid: string}>({
            query: ({ uuid }) => {
                const type = typeof uuid;
                return {
                    url: `/api/chatbot/chat/conversation/${uuid}/messages/`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
        }),
        getAllConversations: builder.query({
            query: () => ({
                url: '/api/chatbot/conversations/',
                method: 'GET',
                providesTags: ['Conversations'],
            }),
            transformResponse: (response: Array<{ id: string; name: string }>) => response,
        }),
        deleteConversation: builder.mutation({
            query: ({uuid}) => ({
                url: `/api/chatbot/chat/conversation/${uuid}/`,
                method: 'DELETE',
            }),
        }),
    })
});

export const { useGetInstructionQuery,
    useSetInstructionMutation,
    useCreateConversationMutation,
    useSendInputMutation,
    useGetChatHistoryQuery,
    useGetAllConversationsQuery,
    useDeleteConversationMutation,
} = chatApiSlice;

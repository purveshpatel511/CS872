const ENDPOINTS = {
  LOGIN: "/login/",
  SIGNUP: "/signup/",
  VALIDATE_TOKEN: "/validate-token/",
  SAVE_EDITOR_CONTENT: "/save_editor_text/",
  FETCH_ALL_WRITER_DOCUMENTS: "/writer-documents/",
  FETCH_WRITER_DOCUMENT_PRESIGNED_URL: (documentId) =>
    `/writer-documents-presigned-url/${documentId}/`,
  FETCH_ALL_CURATORS: "/all-curators/",
  SEND_CURATOR_INVITATIONS: "/send-curator-invitaion/",
  FETCH_CURATOR_NOTIFICATIONS: "/curator-notification-dashboard/",
  CURATOR_ACCEPT_OR_DECLINE_INVITATION: "/curator-accept-decline-invitations/",
  UPDATE_CURATOR_FEEDBACK: "/update-curator-feedback/",
  FETCH_WRITER_NOTIFICATIONS: "/writer-notification-dashboard/",
  FETCH_CURATOR_PROFILE: "/curator-profile/",
  UPLOAD_EDITOR_PDF_FILE: "/upload_editor_pdf/",
  WRITER_AI_HELP: "/generate-text/"
};
export default ENDPOINTS;

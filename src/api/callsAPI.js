// importing axios instance with default bearer token
import instance from "../utils/instance";
// Instantiate api calls object for instance calls
export const callsAPI = {
  getCallsList: async () => {
    return instance.post("/getList").then((res) => res.data);
  },
  getCallsListWithParams: async (data) => {
    const { date_start, date_end, in_out } = data;
    return instance
      .post(
        `/getList?date_start=${date_start}&date_end=${date_end}&in_out=${in_out}`
      )
      .then((res) => res.data);
  },
  getSingleCall: async (recordId, partnerId) => {
    return instance
      .post(`/getRecord?record=${recordId}&partnership_id=${partnerId}`, {
        responseType: "arraybuffer",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_BEARER_TOKEN,
          "Content-type": "audio/mpeg,audio/x-mpeg,audio/x-mpeg-3,audio/mpeg3",
          "Content-Transfer-Encoding": "binary",
          "Content-Disposition": "filename:record.mp3;",
        },
      })
      .then((res) => res.data);
  },
};

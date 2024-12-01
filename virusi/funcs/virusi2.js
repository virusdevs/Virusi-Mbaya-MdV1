import config from '../../set.cjs';

const Callupdate = async (json, sock) => {
   for (const id of json) {
      if (id.status === 'offer' && config.AUTO_REJECT_CALLS ) {
         let msg = await sock.sendMessage(id.from, {
            text: `*_📞 Auto Call Reject Mode Activated by Virusi-Mbaya-Md_* \n*_📵 No Calls Allowed Dude!_*`,
            mentions: [id.from],
         });
         await sock.rejectCall(id.id, id.from);
      }
   }
};

export default Callupdate;

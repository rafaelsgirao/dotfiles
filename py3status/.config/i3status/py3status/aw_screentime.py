# -*- coding: utf-8 -*-
"""
Simple module to display total active screen time with py3status.
"""


# NOTE: Might not treat timezones correctly.
class Py3status:
    def aw_screentime(self):
        
        from datetime import datetime, time, timedelta
        import aw_client
        import socket
        
        # Set this to your AFK bucket
        bucket_id = "aw-watcher-afk_{}".format(socket.gethostname())
        
        daystart = datetime.combine(datetime.now().date(), time())
        dayend = daystart + timedelta(days=1)
        
        awc = aw_client.ActivityWatchClient("testclient")
        events = awc.get_events(bucket_id, start=daystart, end=dayend)
        events = [e for e in events if e.data["status"] == "not-afk"]
        total_duration = sum((e.duration for e in events), timedelta())
        #print("Total time spent on computer today: {}".format(total_duration))
        total_hours = int(str(total_duration).split(":")[0])
        total_minutes = int(str(total_duration).split(":")[1])
        return {
            'full_text': f'⏳{total_hours}h {total_minutes}min',
            'cached_until': self.py3.time_in(seconds=300) 
        }

# -*- coding: utf-8 -*-
"""
Simple module to display active window title with py3status. 
"""

class Py3status:
    def cw_title(self):
        
        from ewmh import EWMH
        wm = EWMH()
        win = wm.getActiveWindow()
        win_name = win.get_wm_name()
        print(type(win_name))
        return {
            'full_text': win_name, 
            'cached_until': self.py3.time_in(seconds=1)
                }

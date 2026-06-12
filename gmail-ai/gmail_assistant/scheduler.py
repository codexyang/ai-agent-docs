import threading
import time

import schedule


def start_scheduler(job_function, daily_time: str = '09:00') -> None:
    schedule.clear()
    schedule.every().day.at(daily_time).do(job_function)

    def run_loop() -> None:
        while True:
            schedule.run_pending()
            time.sleep(15)

    thread = threading.Thread(target=run_loop, daemon=True)
    thread.start()

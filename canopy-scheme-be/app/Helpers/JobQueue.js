const Kue = use("Kue");

class JobQueue {
  static queueJob({
    jobKey,
    data,
    options: {
      priority = "normal",
      attempts = 1,
      remove = true,
      jobFn = () => {}
    }
  }) {
    Kue.dispatch(jobKey, data, { priority, attempts, remove, jobFn });
  }
}

module.exports = JobQueue;

export default {
  format: (timeStamp, format) => {
    var date = new Date(timeStamp);
    switch (format) {
      case 'MM/DD/YYYY HH:MM':
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }).format(date);
      default:
        return date;
    }
  }
};

const appStrings = {
  actions: {
    load: "load",
    new: "new",
    clear: "clear"
  },
  header: {
    title: "Users",
    login: "Login",
    soon: "Coming Soon...not really :P"
  },
  global: {
    save: "save",
    delete: "delete",
    clear: "clear",
    close: "close"
  },
  card: {
    details: "details"
  },
  detail: {
    general: "general",
    address: "address"
  },
  general: {
    lastName: "last name",
    firstName: "first name",
    gender: "gender",
    email: "email address",
    dob: "dob"
  },
  address: {
    street: "street",
    city: "city",
    state: "state",
    postcode: "postal code"
  },
  filter: {
    male: "male",
    female: "female",
    namePlaceholder: "filter by name..."
  }
};
Object.freeze(appStrings);

export default (state = appStrings) => {
  return state;
};

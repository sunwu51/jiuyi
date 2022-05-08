import { html, LitElement } from 'lit';
import { customElement, query, state, property } from 'lit/decorators.js';
import '@vaadin/date-picker';
import { DatePicker, DatePickerDate, DatePickerValueChangedEvent } from '@vaadin/date-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

@customElement('w-date')
export class Example extends LitElement {

  @property()
  changeHandler = null;

  @query('vaadin-date-picker')
  private datePicker?: DatePicker;

  @state()
  private selectedDateValue: string = dateFnsFormat(new Date(), 'yyyyMMdd');

  firstUpdated() {
    const formatDateIso8601 = (dateParts: DatePickerDate): string => {
      const { year, month, day } = dateParts;
      const date = new Date(year, month, day);

      return dateFnsFormat(date, 'yyyyMMdd');
    };

    const parseDateIso8601 = (inputValue: string): DatePickerDate => {
      const date = dateFnsParse(inputValue, 'yyyyMMdd', new Date());

      return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
    };

    if (this.datePicker) {
      this.datePicker.i18n = {
        ...this.datePicker.i18n,
        formatDate: formatDateIso8601,
        parseDate: parseDateIso8601,
      };
    }
  }
  _onchange(e){
    
    this.changeHandler(this.shadowRoot.querySelector('vaadin-date-picker').value.replace(/-/g, ''))
  }


  render() {
    return html`
      <vaadin-date-picker
        style="width: 300px"
        label="阳历生日:"
        value="${this.selectedDateValue}"
        helper-text="Select or input your birthday with format yyyyMMdd"
        @change="${this._onchange}"
      ></vaadin-date-picker>
    `;
  }
}
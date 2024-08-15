import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-modal-pattern',
  templateUrl: './modal-pattern.component.html',
  styleUrls: ['./modal-pattern.component.css']
})
export class ModalPatternComponent {
@Input() dataSelect: string;

  cerrarModal() {

    console.log(this.dataSelect);
    // Aquí deberías cerrar la modal
  }

}

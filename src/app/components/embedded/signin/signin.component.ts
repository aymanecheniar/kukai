import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message/message.service';
import { TorusService } from '../../../services/torus/torus.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loading = false;
  @Output() loginResponse = new EventEmitter();
  constructor(
    private messageService: MessageService,
    public torusService: TorusService
  ) { }

  ngOnInit(): void {
  }
  abort() {
    this.loginResponse.emit(null);
  }
  async login(typeOfLogin: string) {
    try {
      this.messageService.startSpinner('Mocking DirectAuth wallet...');
      const loginData = await this.mockLogin(); // Mock locally
      //const loginData = this.torusService.loginTorus(typeOfLogin);
      this.loginResponse.emit(loginData);
    } finally {
      this.messageService.stopSpinner();
    }
  }
  private async mockLogin(): Promise<any> {
    const keyPair = {
      sk: "spsk1VfCfhixtzGvUSKDre6jwyGbXFm6aoeLGnxeVLCouueZmkgtJF",
      pk: "sppk7cZsZeBApsFgYEdWuSwj92YCWkJxMmBfkN3FeKRmEB7Lk5pmDrT",
      pkh: "tz2WKg52VqnYXH52TZbSVjT4hcc8YGVKi7Pd"
    }
    const userInfo = {
      typeOfLogin: 'google',
      verifierId: 'mock.user@gmail.com',
      name: 'Mock User'
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ keyPair, userInfo });
      }, 2000);
    })
  }
}

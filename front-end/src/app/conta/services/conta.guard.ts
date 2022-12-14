import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/utils/localstorage";

import { CadastroComponent } from "../cadastro/cadastro.component";


@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate {

    locaStorageUtils = new LocalStorageUtils();

    constructor(private router: Router) {}

    canDeactivate(component: CadastroComponent): boolean {
        
        if (component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o formulário?');
        }

        return true;
    }

    canActivate(): boolean {
        if (this.locaStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/home']);
        }

        return true;
    }

}
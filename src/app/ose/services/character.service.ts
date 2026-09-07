import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CharacterModel, SpellModel } from "../models/character.model";

interface IMessage {
  message: string;
  character: CharacterModel;
}

@Injectable({
  providedIn: 'root',
})
export default class CharacterService {
  private readonly apiUrl = `${environment.apiUrl}/ose/character`;
  private readonly httpClient = inject(HttpClient);

  public create(name: string) {
    return this.httpClient.post<CharacterModel>(this.apiUrl, { name });
  }

  public list() {
    return this.httpClient.get<CharacterModel[]>(this.apiUrl);
  }

  public read(id: string) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/${id}`);
  }

  public update(id: string, name: string) {
    return this.httpClient.patch<CharacterModel>(`${this.apiUrl}/${id}`, { name });
  }

  public createSpell(id: string, spell: SpellModel) {
    return this.httpClient.post<CharacterModel>(`${this.apiUrl}/${id}/spells`, spell);
  }

  public readSpell(id: string, spellId: string) {
    return this.httpClient.get<SpellModel>(`${this.apiUrl}/${id}/spells/${spellId}`);
  }

  public updateSpell(id: string, spell: SpellModel) {
    return this.httpClient
      .put<CharacterModel>(`${this.apiUrl}/${id}/spells/${spell._id}`, spell);
  }

  public deleteSpell(id: string, spellId: string) {
    return this.httpClient.delete<CharacterModel>(`${this.apiUrl}/${id}/spells/${spellId}`);
  }

  public prepareSpell(id: string, spellId: string) {
    return this.httpClient.post<CharacterModel>(`${this.apiUrl}/${id}/spells/prepared`, { spellId });
  }

  public unpreparedSpell(id: string, spellId: string) {
    return this.httpClient.delete<CharacterModel>(`${this.apiUrl}/${id}/spells/prepared/${spellId}`);
  }

}

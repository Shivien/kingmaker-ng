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

  public addKnownSpell(id: string, spell: SpellModel) {
    return this.httpClient.post<CharacterModel>(`${this.apiUrl}/${id}/spells/known`, spell);
  }

  public deleteKnownSpell(id: string, spellId: string) {
    return this.httpClient.delete<IMessage>(`${this.apiUrl}/${id}/spells/known/${spellId}`);
  }

  public memoriseSpell(id: string, spell: SpellModel) {
    return this.httpClient.post<CharacterModel>(`${this.apiUrl}/${id}/spells/memorise`, { spellId: spell._id });
  }

  public deleteMemorisedSpell(id: string, spellId: string) {
    return this.httpClient.delete<IMessage>(`${this.apiUrl}/${id}/spells/memorised/${spellId}`);
  }

}

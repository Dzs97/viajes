"use client";

import { useState } from "react";
import { basicsCategories, groupByCategory, totalCostUSD, type BasicItem } from "../data/basics";
import { exchangeRates, formatAmount, type Currency } from "../data/budget";
import { useBasicsState, cycleStatus } from "../lib/useBasicsState";

const CURRENCIES: Currency[] = ["MXN", "USD", "EUR", "GBP"];

export default function BasicsSection() {
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [addingToCategory, setAddingToCategory] = useState<string | null>(null);
  const {
    items,
    updateItem,
    deleteItem,
    addItem,
    reset,
    hydrated,
    syncStatus,
    lastError,
    setPin,
    getPin,
  } = useBasicsState();

  const grouped = groupByCategory(items);
  const total = totalCostUSD(items);

  if (items.length === 0 && hydrated === false) return null;

  // Get original index in items[] for each item (needed for updates)
  const getItemIndex = (item: BasicItem) => items.indexOf(item);

  const handleResetClick = () => {
    if (confirm("¿Resetear todos los items a los defaults del archivo? Esto borra todos tus cambios sincronizados.")) {
      reset();
    }
  };

  const handlePinClick = () => {
    const current = getPin() ?? "";
    const newPin = prompt(
      current
        ? "PIN actual configurado. Ingresa nuevo PIN (vacío para borrar):"
        : "Ingresa el PIN de edición (configurado en Vercel como EDIT_PIN):",
      current
    );
    if (newPin !== null) {
      setPin(newPin);
      if (newPin) {
        alert("PIN guardado. Los próximos cambios se sincronizarán.");
      } else {
        alert("PIN borrado. Los cambios solo serán locales.");
      }
    }
  };

  const syncLabel: Record<typeof syncStatus, string> = {
    idle: "—",
    loading: "Cargando…",
    syncing: "Sincronizando…",
    synced: "✓ Sincronizado",
    error: "⚠ Error",
    offline: "⚠ Sin sync",
  };

  const syncClass: Record<typeof syncStatus, string> = {
    idle: "sync-idle",
    loading: "sync-loading",
    syncing: "sync-loading",
    synced: "sync-ok",
    error: "sync-error",
    offline: "sync-error",
  };

  return (
    <section className="basics-section" id="basics">
      <div className="basics-header">
        <div className="hero-eyebrow">Antes del viaje</div>
        <h2 className="basics-title">Basics</h2>
        <p className="basics-subtitle">
          Lista editable. Click en el status para cambiar (pendiente → comprado → empacado → opcional). Los cambios se guardan en tu navegador.
        </p>
        <div className="basics-toolbar">
          <div className="currency-toggle" role="group" aria-label="Cambiar moneda basics">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                className="currency-btn"
                data-active={currency === c}
                onClick={() => setCurrency(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <span className={`sync-indicator ${syncClass[syncStatus]}`} title={lastError || ""}>
            {syncLabel[syncStatus]}
          </span>
          <button className="basics-reset-btn" onClick={handlePinClick} title="Configurar PIN de edición">
            🔒 PIN
          </button>
          <button className="basics-reset-btn" onClick={handleResetClick} title="Resetear a defaults del archivo">
            🔄 Reset
          </button>
        </div>
        {lastError && (
          <p className="basics-sync-error">{lastError}</p>
        )}
      </div>

      <div className="basics-grid">
        {basicsCategories.map((cat) => {
          const categoryItems = grouped[cat.id] ?? [];
          return (
            <div key={cat.id} className="basics-category">
              <h3 className="basics-category-title">
                <span className="basics-category-icon">{cat.icon}</span>
                {cat.label}
                <span className="basics-category-count">{categoryItems.length}</span>
              </h3>
              <ul className="basics-items">
                {categoryItems.map((item) => {
                  const index = getItemIndex(item);
                  const isEditing = editingIndex === index;
                  return (
                    <BasicItemCard
                      key={index}
                      item={item}
                      index={index}
                      currency={currency}
                      isEditing={isEditing}
                      onCycleStatus={() => updateItem(index, { status: cycleStatus(item.status) })}
                      onEdit={() => setEditingIndex(isEditing ? null : index)}
                      onSave={(updates) => {
                        updateItem(index, updates);
                        setEditingIndex(null);
                      }}
                      onCancel={() => setEditingIndex(null)}
                      onDelete={() => {
                        if (confirm(`¿Eliminar "${item.name}"?`)) {
                          deleteItem(index);
                          setEditingIndex(null);
                        }
                      }}
                    />
                  );
                })}
                {addingToCategory === cat.id ? (
                  <AddItemForm
                    category={cat.id}
                    onSave={(newItem) => {
                      addItem(newItem);
                      setAddingToCategory(null);
                    }}
                    onCancel={() => setAddingToCategory(null)}
                  />
                ) : (
                  <li>
                    <button className="basics-add-btn" onClick={() => setAddingToCategory(cat.id)}>
                      ➕ Agregar item
                    </button>
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {total > 0 && (
        <div className="basics-footer">
          <span className="basics-footer-label">Costo total estimado de compras</span>
          <span className="basics-footer-amount">{formatAmount(total, currency)}</span>
        </div>
      )}
    </section>
  );
}

function BasicItemCard({
  item,
  index,
  currency,
  isEditing,
  onCycleStatus,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: {
  item: BasicItem;
  index: number;
  currency: Currency;
  isEditing: boolean;
  onCycleStatus: () => void;
  onEdit: () => void;
  onSave: (updates: Partial<BasicItem>) => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const status = item.status ?? "pendiente";

  if (isEditing) {
    return (
      <li className="basic-item basic-item-editing">
        <EditItemForm item={item} onSave={onSave} onCancel={onCancel} />
      </li>
    );
  }

  return (
    <li className="basic-item">
      <div className="basic-item-main">
        <div className="basic-item-header">
          <span className="basic-item-name">
            {item.brand && <span className="basic-item-brand">{item.brand}</span>}
            {item.name}
          </span>
          <button
            className={`status-pill status-${status} status-clickable`}
            aria-label={`Estado: ${status}. Click para cambiar.`}
            onClick={onCycleStatus}
            title="Click para cambiar status"
          >
            {status}
          </button>
        </div>
        {item.priceUSD !== undefined && item.priceUSD > 0 && (
          <span className="basic-item-price">{formatAmount(item.priceUSD, currency)}</span>
        )}
      </div>
      <p className="basic-item-description">{item.description}</p>
      {item.notes && <p className="basic-item-notes">{item.notes}</p>}
      <div className="basic-item-meta">
        {item.forUser && <span className="basic-item-tag">Para: {item.forUser}</span>}
        {item.url && (
          <a className="basic-item-link" href={item.url} target="_blank" rel="noopener noreferrer">
            Ver producto →
          </a>
        )}
        <div className="basic-item-actions">
          <button className="basic-item-action-btn" onClick={onEdit} title="Editar">
            ✏️
          </button>
          <button className="basic-item-action-btn basic-item-action-delete" onClick={onDelete} title="Eliminar">
            🗑
          </button>
        </div>
      </div>
    </li>
  );
}

function EditItemForm({
  item,
  onSave,
  onCancel,
}: {
  item: BasicItem;
  onSave: (updates: Partial<BasicItem>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<BasicItem>({ ...item });

  return (
    <form
      className="basic-edit-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <FormFields form={form} setForm={setForm} />
      <div className="basic-edit-actions">
        <button type="button" className="basic-edit-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="basic-edit-save">
          Guardar
        </button>
      </div>
    </form>
  );
}

function AddItemForm({
  category,
  onSave,
  onCancel,
}: {
  category: string;
  onSave: (item: BasicItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<BasicItem>({
    name: "",
    brand: "",
    category,
    description: "",
    priceUSD: 0,
    status: "pendiente",
    forUser: "ambos",
    notes: "",
    url: "",
  });

  return (
    <li className="basic-item basic-item-editing">
      <form
        className="basic-edit-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim()) return;
          onSave(form);
        }}
      >
        <FormFields form={form} setForm={setForm} />
        <div className="basic-edit-actions">
          <button type="button" className="basic-edit-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="basic-edit-save">
            Agregar
          </button>
        </div>
      </form>
    </li>
  );
}

function FormFields({
  form,
  setForm,
}: {
  form: BasicItem;
  setForm: (item: BasicItem) => void;
}) {
  const update = (updates: Partial<BasicItem>) => setForm({ ...form, ...updates });

  return (
    <div className="basic-edit-fields">
      <label className="basic-edit-label">
        <span>Nombre *</span>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Ej. Adaptador UK Type G"
        />
      </label>

      <div className="basic-edit-row">
        <label className="basic-edit-label">
          <span>Marca</span>
          <input
            type="text"
            value={form.brand ?? ""}
            onChange={(e) => update({ brand: e.target.value })}
            placeholder="Ej. Adidas"
          />
        </label>

        <label className="basic-edit-label">
          <span>Precio USD</span>
          <input
            type="number"
            min="0"
            step="1"
            value={form.priceUSD ?? 0}
            onChange={(e) => update({ priceUSD: Number(e.target.value) || 0 })}
          />
        </label>
      </div>

      <label className="basic-edit-label">
        <span>Descripción</span>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Para qué sirve, dónde usarlo..."
        />
      </label>

      <label className="basic-edit-label">
        <span>Notas</span>
        <textarea
          rows={2}
          value={form.notes ?? ""}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="Tips, alternativas, recordatorios..."
        />
      </label>

      <div className="basic-edit-row">
        <label className="basic-edit-label">
          <span>Status</span>
          <select
            value={form.status ?? "pendiente"}
            onChange={(e) => update({ status: e.target.value as BasicItem["status"] })}
          >
            <option value="pendiente">pendiente</option>
            <option value="comprado">comprado</option>
            <option value="empacado">empacado</option>
            <option value="opcional">opcional</option>
          </select>
        </label>

        <label className="basic-edit-label">
          <span>Para</span>
          <select
            value={form.forUser ?? "ambos"}
            onChange={(e) => update({ forUser: e.target.value as BasicItem["forUser"] })}
          >
            <option value="ambos">ambos</option>
            <option value="Diego">Diego</option>
            <option value="pareja">pareja</option>
          </select>
        </label>

        <label className="basic-edit-label">
          <span>Categoría</span>
          <select
            value={form.category}
            onChange={(e) => update({ category: e.target.value })}
          >
            <option value="calzado">Calzado</option>
            <option value="ropa">Ropa</option>
            <option value="electronica">Electrónica</option>
            <option value="documentos">Documentos</option>
            <option value="salud">Salud y farmacia</option>
            <option value="misc">Misc</option>
          </select>
        </label>
      </div>

      <label className="basic-edit-label">
        <span>URL (opcional)</span>
        <input
          type="url"
          value={form.url ?? ""}
          onChange={(e) => update({ url: e.target.value })}
          placeholder="https://..."
        />
      </label>
    </div>
  );
}

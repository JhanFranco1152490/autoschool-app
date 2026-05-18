import { BACKEND_ORIGIN } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

function useDashboard({
    dashboardSchema,
    dashboardDefaultForm,
    loadItems = async () => console.log("load"),
    loadError = (err) => "Error al cargar:" + err.message,
    createItem = async (data) => console.log("create", data),
    createSuccess = "Creado exitosamente",
    createError = (err) => "Error al crear:" + err.message,
    updateItem = async (id, data) => console.log("update", id, data),
    updateSuccess = "Actualizado exitosamente",
    updateError = (err) => "Error al actualizar" + err.message,
    deleteItem = async (id) => console.log("delete", id),
    deleteSuccess = "Borrado exitosamente",
    deleteError = (err) => "Error al borrar" + err.message,
}) {

    const [dashboardData, setDashboardData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [uploadStudent, setUploadStudent] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(dashboardSchema),
    });

    const clearMessages = () => {
        setError("")
        setSuccess("")
    }

    const displayFormModal = (mode, data) => {
        setUpdateModal(mode)
        if (mode) {
            reset(data)
            clearMessages()
        }
        else {
            reset(dashboardDefaultForm)
        }
    }

    const loadData = async () => {
        try {
            setIsLoading(true);
            const data = await loadItems();
            setDashboardData(data);
        } catch (err) {
            setError(err.response?.data?.detail || loadError(err));
        } finally {
            setIsLoading(false);
        }
    };

    const createData = async (data) => {
        try {
            clearMessages()
            await createItem(data);
            setSuccess(createSuccess);
            reset();
            loadData();
        } catch (err) {
            setError(err.response?.data?.detail || createError(err));
        }
    };

    const updateData = async (data) => {
        try {
            clearMessages()
            await updateItem(selectedData.id, data);
            setSuccess(updateSuccess);
            displayFormModal(false)
            loadData();
        } catch (err) {
            setError(err.response?.data?.detail || updateError(err));
        }
    }

    const deleteData = async (id) => {
        setDeleteModal(false)
        try {
            clearMessages()
            await deleteItem(id);
            setSuccess(deleteSuccess);
            loadData();
        } catch (err) {
            setError(err.response?.data?.detail || deleteError(err));
        }
    }

    return (
        {
            dashboardData,
            selectedData,
            setSelectedData,
            updateModal,
            setDeleteModal,
            isLoading,
            error,
            success,
            register,
            handleSubmit,
            errors,
            isSubmitting,
            loadData,
            createData,
            updateData,
            deleteData,
            displayFormModal,
            deleteModal,
            uploadStudent,
            setUploadStudent,
        }
    )
}

export { useDashboard };
